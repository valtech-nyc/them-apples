import React, { Component } from 'react';

import sio from 'socket.io-client';

import './App.css';
import { Loop, Stage, Body, World } from 'react-game-kit';
import Player from './player';
import playerSprite from './assets/character-sprite.png';

import Apple from './components/apple';

class App extends Component {

    state = {
        currentPlayer: {
            id: 0,
            name: '',
            positionX: 100,
            positionY: 10,
            speed: 100,
            directionDegrees: 0,
            score: 10,
            lastUpdateTime: 0,
            sizeMultiple: 2
        },
        otherPlayers: []
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
        this.io = sio(process.env.PUBLIC_URL, {
            path: '/game'
        });

        this.io.on('connect', () => {
            this.io.on('msg', msg => console.log(msg));
            this.io.emit('msg', 'hello');
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        const keys = {
            ENTER: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

        const MOVEMENT_AMOUNT = 10;
        const currentPositionX = this.state.currentPlayer.positionX;
        const currentPositionY = this.state.currentPlayer.positionY;
        let newPositionX = currentPositionX;
        let newPositionY = currentPositionY;

        switch (e.which) {
            case keys.LEFT:
                newPositionX = currentPositionX - MOVEMENT_AMOUNT;
                break;
            case keys.DOWN:
                newPositionY = currentPositionY + MOVEMENT_AMOUNT;
                break;
            case keys.UP:
                newPositionY = currentPositionY - MOVEMENT_AMOUNT;
                break;
            case keys.RIGHT:
                newPositionX = currentPositionX + MOVEMENT_AMOUNT;
                break;
        }

        const newState = { ...this.state };
        newState.currentPlayer.positionX = newPositionX;
        newState.currentPlayer.positionY = newPositionY;
        this.setState(newState);
    };

    render() {
        return (
            <Loop>
                <Stage style={ { background: '#000' } }>
                    <World>
                        <Apple color={'red'} x={100} y={150} />
                        <Body args={[10, 10]}>
                            <Player
                                spritePath={playerSprite}
                                sizeMultiple={this.state.currentPlayer.sizeMultiple}
                                positionX={this.state.currentPlayer.positionX}
                                positionY={this.state.currentPlayer.positionY}
                            />
                        </Body>
                    </World>
                </Stage>
            </Loop>
        );
    }
}

export default App;
