// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const express = require('express');
const sio = require('socket.io')
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const paths = require('../config/paths');
const routes = require('./routes');

const app = express();
app.use(favicon(path.join(paths.appAssets, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(paths.appAssets));

app.use('/', routes);

if (app.get('env') === 'development') {
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const config = require('../config/webpack.config.dev');

    const compiler = webpack(config);

    app.use(webpackMiddleware(compiler, {
        quiet: true,
        publicPath: config.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const io = sio({
    path: '/game'
});

const players = [];
const apples = [];
const eatenApples = [];
const NUMBER_OF_APPLES = 100;
const APPLE_WIDTH = 34;
const APPLE_HEIGHT = 46;
let appleCollisionCoords = {};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This computes all the possible collision points for the
// generated apples. This is NOT the best approach since the more
// apples there are, the longer it takes to create the collision object.
// Someone should work on a better collision detection algorithm
const getAppleAreaCoords = (apple) => {
    let halfAppleHeight = APPLE_HEIGHT / 2;
    let halfAppleWidth = APPLE_WIDTH / 2;

    let appleQ1Q3X = apple.x - halfAppleWidth;
    let appleQ2Q4X = apple.x + halfAppleWidth;
    let appleQ1Q2Y = apple.y + halfAppleHeight;
    let appleQ3Q4Y = apple.y - halfAppleHeight;

    let upperLeftCorner = {
        x: appleQ1Q3X,
        y: appleQ1Q2Y
    };

    let upperRightCorner = {
        x: appleQ2Q4X,
        y: appleQ1Q2Y
    };

    let lowerLeftCorner = {
        x: appleQ1Q3X,
        y: appleQ3Q4Y
    };

    let lowerRightCorner = {
        x: appleQ2Q4X,
        y: appleQ3Q4Y
    };

    let appleAreaCoords = {};

    // Iterate through each x column on the y row
    for (let row = upperLeftCorner.y; row >= lowerLeftCorner.y; row --) {
        for (let column = upperLeftCorner.x; column <= upperRightCorner.x; column ++) {
            // Create a unique key to look up the collision... (check for negative since we can't use "-" in a property name)
            appleAreaCoords[`${column < 0 ? 'N' + column * -1 : column}.${row < 0 ? 'N' + row * -1 : row}`] = {
                appleId: apple.id
            };
        }
    }

    return appleAreaCoords;

};


console.log('LOADING APPLES');
for (let i = 0; i < NUMBER_OF_APPLES; i++) {
    let apple = {
        id: i,
        color: 'blue',
        x: getRandomInt(0, 2000),
        y: getRandomInt(0, 2000)
    };

    apples.push(apple);
    appleCollisionCoords = Object.assign({}, appleCollisionCoords, getAppleAreaCoords(apple));
}
console.log('FINISHED!');


io.on('connection', socket => {

    socket.on('join game', playerState => {
        let player = playerState;
        player.id = players.length;
        players.push(player);
        socket.emit('set player id', player.id);
        socket.emit('init apples', apples);

        console.log(`Player ${player.id} joined.`);
        socket.broadcast.emit('player joined', player);
        socket.broadcast.emit('player list update', players);
    });

    socket.on('update player state', playerState => {
        players[players.findIndex(player => player.id === playerState.id)] = playerState;

        // Check if apple was eaten
        let appleCollision = appleCollisionCoords[`${playerState.positionX}.${playerState.positionY}`];
        if (appleCollision && eatenApples.findIndex(appleId => appleCollision.appleId === appleId) === -1) {
            console.log(`Apple ${appleCollision.appleId} was eaten!`);
            eatenApples.push(appleCollision.appleId);
            apples.splice(apples.findIndex(apple => apple.id === appleCollision.appleId), 1);
            socket.emit('init apples', apples);
            socket.broadcast.emit('init apples', apples);
        }

        socket.broadcast.emit('player list update', players);
    });

    // Disconnect logic
    socket.on('disconnect', playerState => {
        socket.emit('player disconnected', playerState);
        players.splice(players.findIndex(player => player.id === playerState.id), 1);
        socket.broadcast.emit('player list update', players);
    });
});

exports.app = app;
exports.io = io;
