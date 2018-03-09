import React, { Component } from 'react';

import sio from 'socket.io-client';

import './App.css';
import { Loop, Stage, Body, World } from 'react-game-kit';
import Player from './components/player/player';
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


        // Player messages
        this.io.on('connect', () => {
            this.io.emit('join game', this.state.currentPlayer);
        });

        this.io.on('set player id', id => {
            console.log(`You are player ${id}`);
            this.setState({ currentPlayer: {
                ...this.state.currentPlayer,
                id: id
            }
            });
        });


        // Server messages
        this.io.on('player joined', playerState => {
            console.log(`Player ${playerState.id} joined the game.`, playerState);
        });

        this.io.on('player list update', playersList => {
            console.log('Updated player list.', playersList);
            this.setState({ otherPlayers: playersList.filter(player => player.id !== this.state.currentPlayer.id) });
        });

        this.io.on('player disconnected', playerState => {
            console.log(`Player ${playerState.id} disconnected.`);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
        this.io.emit('disconnect', this.state.currentPlayer);
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

        this.setState({
            ...this.state,
            currentPlayer: {
                ...this.state.currentPlayer,
                positionX: newPositionX,
                positionY: newPositionY
            }
        });

        this.io.emit('update player state', {
            ...this.state.currentPlayer,
            positionX: newPositionX,
            positionY: newPositionY
        });
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
