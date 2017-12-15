import React, { Component } from 'react';
import sio from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import Scoreboard from './components/scoreboard.js';
import { Loop, Stage } from 'react-game-kit';

import Apple from './components/apple';

class App extends Component {
    componentDidMount () {
        this.io = sio(process.env.PUBLIC_URL, {
            path: '/game'
        });

        this.io.on('connect', () => {
            this.io.on('msg', msg => console.log(msg));
            this.io.emit('msg', 'hello');
        });
    }

    render () {
        return (
            <Loop>
                <Stage style={ { background: '#000' } }>
                    <img src={logo} />

                    <Apple color={'red'} x={100} y={150} />
                </Stage>
            </Loop>
        );
    }
}

export default App;
