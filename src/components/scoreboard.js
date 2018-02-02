import React from 'react';
import './scoreboard.css';
export default class Scoreboard extends React.Component {
    constructor() {
        super();
    }

    render () {
        return (
            <div className="component-scoreboard">
                [scoreboard goes here]
                {this.props.color}
            </div>
        );
    }

}

