import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Loop, Stage } from 'react-game-kit';

import Apple from './components/apple';

class App extends Component {
    render() {
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
