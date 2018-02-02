import React, { Component } from 'react';
import sio from 'socket.io-client';
import Map from './world-map/World-Map';
import './App.css';
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
                    <Apple color={'red'} x={100} y={150} />
                    <Map/>
                </Stage>
            </Loop>
        );
    }
}

export default App;
