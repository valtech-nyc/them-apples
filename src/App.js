import React, { Component } from 'react';
import sio from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import { Loop, Stage } from 'react-game-kit';

class App extends Component {
    componentDidMount () {
        this.io = sio('http://localhost:3000', {
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
                </Stage>
            </Loop>
        );
    }
}

export default App;
