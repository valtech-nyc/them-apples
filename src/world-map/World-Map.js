import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 5000,
            height: 5000
        };
    }

    render() {
        return (
            <TileMap
                style={{ top: Math.floor(-63 * this.context.scale) }}
                src="https://pre00.deviantart.net/3040/th/pre/i/2010/201/a/4/epic_game_map_by_csto.jpg"
                rows={1}
                columns={6}
                tileSize={512}
                layers={[
                    [1, 2, 3, 4, 5, 6],
                ]}
            />
        );

        // const style = {
        //     width: `${this.state.width}px`,
        //     height: `${this.state.height}px`,
        //     backgroundColor: '#7b9a2d',
        //     backgroundImage: `url(${'https://pre00.deviantart.net/3040/th/pre/i/2010/201/a/4/epic_game_map_by_csto.jpg'})`, //PLACEHOLDER, REPLACE!!
        //     backgroundPosition: `0px 0px`,
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'contain'
        // };
        //
        // return (
        //     <div className="world-map" style={ style }>
        //         WORLD MAP
        //     </div>
        // );
    }
}

export default Map;
