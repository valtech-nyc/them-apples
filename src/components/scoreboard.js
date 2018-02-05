import React from 'react';
import './scoreboard.css';
export default class Scoreboard extends React.Component {

    render () {
        console.log(this.props.otherPlayers);
        return (
            <div className="component-scoreboard">
                <h2>Score</h2>
                <ul>
                    <li class="current-player">
                        <strong>{this.props.currPlayer.name || 'You'}</strong><small>{this.props.currPlayer.score}</small>
                    </li>
                    {this.props.otherPlayers.map((player, index) =>
                        <li key={index}>
                            <strong>{player.name}</strong><small>{player.score}</small>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

