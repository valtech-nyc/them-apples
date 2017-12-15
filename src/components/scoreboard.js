import React from 'react';

export default class Scoreboard extends React.Component {
    constructor() {
        super();
    }

    render() {


        return (
            <div>
                [scoreboard goes here]
                {this.props.color}
            </div>
        );
    }

}

