// Ensure environment variables are read.
import '../config/env';

import path from 'path';
import express from 'express';
import sio from 'socket.io';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import paths from '../config/paths';
import routes from './routes';
import { ioDelta } from './deltas';
import run from './run';

const reducer = (state, action) => state;
const initial = {};

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
    const config = require('../config/webpack.config.dev').default;

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

export const stop = run(reducer, initial, [
    ioDelta(io)
]);
export { app, io  };
