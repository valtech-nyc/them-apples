import React, { Component } from 'react';
import './App.css';
import { Loop, Stage, Body, World } from 'react-game-kit';
import Player from './player';
import playerSprite from './assets/character-sprite.png';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        const keys = {
            ENTER: 13,
            A: 97,  // LEFT
            S: 115, // DOWN
            W: 119, // UP
            D: 100  // RIGHT
        };

        const MOVEMENT_AMOUNT = 10;
        const currentPositionX = this.state.currentPlayer.positionX;
        const currentPositionY = this.state.currentPlayer.positionY;
        let newPositionX = currentPositionX;
        let newPositionY = currentPositionY;

        switch (e.keyCode) {
            case keys.A:
                newPositionX = currentPositionX - MOVEMENT_AMOUNT;
                break;
            case keys.S:
                newPositionY = currentPositionY + MOVEMENT_AMOUNT;
                break;
            case keys.W:
                newPositionY = currentPositionY - MOVEMENT_AMOUNT;
                break;
            case keys.D:
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
