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
