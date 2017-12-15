import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Loop, Stage } from 'react-game-kit';

class App extends Component {
    render() {
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
