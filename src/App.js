import React, { Component } from 'react';
import './App.css';
import { Loop, Stage, Body, World } from 'react-game-kit';
import Player from './player';
import playerSprite from './assets/character-sprite.png';

class App extends Component {
    render() {
        return (
            <Loop>
                <Stage style={ { background: '#000' } }>
                    <World>
                        <Body args={[10, 10]}>
                            <Player
                                spriteHeight={100}
                                spriteWidth={100}
                                spritePath={playerSprite}
                                sizeMultiple={2}
                            />
                        </Body>
                    </World>
                </Stage>
            </Loop>
        );
    }
}

export default App;
