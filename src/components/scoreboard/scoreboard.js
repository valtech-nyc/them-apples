import React from 'react';
import './scoreboard.css';

class Scoreboard extends React.Component {

    render() {
        // console.log(this.props.currentPlayer);
        // console.log(this.props.otherPlayers);
        return (
            <div className="component-scoreboard">
                <h2>Score</h2>
                <ul>
                    <li className="current-player">
                        <strong>{this.props.currentPlayer.name || 'You'}</strong>
                        <small>{this.props.currentPlayer.score}</small>
                    </li>
                    {this.props.otherPlayers.map((player, index) =>
                        <li key={index}>
                            <strong>{player.name}</strong>
                            <small>{player.score}</small>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

export default Scoreboard;
