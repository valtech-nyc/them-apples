import React from 'react';
import { Sprite } from 'react-game-kit';

class Player extends React.Component {

    constructor(props) {
        super(props);
        const id = props.id || 0;
        this.state = {
            id: id,
            name: props.name || 'player-' + id,
            positionX: props.positionX || 0,
            positionY: props.positionY || 0,
            spritePath: props.spritePath || '',
            sizeMultiple: props.sizeMultiple || 1,
            spriteTileWidth: props.spriteTileWidth || 64,
            spriteTileHeight: props.spriteTileHeight || 64,
            spriteRowState: props.spriteRowState || 0,
            spriteAnimationSequence: props.spriteAnimationSequence || [9, 9, 0, 4, 5]
        };
    }


    getPlayerStyles = () => {
        return {
            position: 'absolute',
            transform: `translate(${this.props.positionX}px, ${this.props.positionY}px)`
        };
    };
    render() {
        return (
            <div id={'player-' + this.state.id} className='player-sprite-container' style={this.getPlayerStyles()}>
                <Sprite
                    repeat={true}
                    src={this.state.spritePath}
                    scale={this.state.sizeMultiple}
                    state={this.state.spriteRowState}
                    steps={this.state.spriteAnimationSequence}
                    tileHeight={this.state.spriteTileHeight}
                    tileWidth={this.state.spriteTileWidth}
                />
                <p>{this.state.name}</p>
            </div>
        );
    }

}

export default Player;
