import React, { Component } from 'react';
import Map from './world-map/World-Map';
import './App.css';
import { Loop, Stage } from 'react-game-kit';

class App extends Component {
    render() {
        return (
            <Loop>
                <Stage style={ { background: '#000' } }>
                    <Map/>
                </Stage>
            </Loop>
        );
    }
}

export default App;
