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
const NUMBER_OF_APPLES = 100;
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        console.log(`Updating Player ${playerState.id} state`);
        players[players.findIndex(player => player.id === playerState.id)] = playerState;
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
