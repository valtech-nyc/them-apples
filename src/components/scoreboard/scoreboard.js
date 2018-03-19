import React from 'react';
import './scoreboard.css';

class Scoreboard extends React.Component {

    render() {
        return (
            <div className="component-scoreboard frame">
                <h2>Score</h2>
                <ul>
                    <li className="current-player">
                        <strong>{this.props.currentPlayer.name}</strong>
                        <small>{this.props.currentPlayer.score}</small>
                    </li>
                    {this.props.otherPlayers.map((player, index) =>
                        <li key={index}>
                            <strong>Player {player.id}</strong>
                            <small>{player.score}</small>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

export default Scoreboard;
