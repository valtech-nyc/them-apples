import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 5000,
            height: 5000
        };
    }

    render() {
        const style = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`,
            backgroundColor: '#7b9a2d'
        };

        return (
            <div className="world-map" style={ style }>
                WORLD MAP
            </div>
        );
    }
}

export default Map;
