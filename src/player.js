import React from 'react'

class Player extends React.Component {

    constructor() {
        super();

        this.state = {
            id: 0,
            name: '',
            positionX: 0,
            positionY: 0,
            spritePath: '',
            spriteWidth: 0,
            spriteHeight: 0
        }
    }

    render() {
        return (
            <div>
                <img
                    src={this.state.spritePath}
                    height={this.state.spriteHeight}
                    width={this.state.spriteWidth}
                />
                <p>{this.state.name}</p>
            </div>
        );
    }

}

export default Player;