import React, { Component } from 'react';
import './apple.css';

class Apple extends Component {
    render () {
        return (
            <div className="apple" style={{ backgroundColor: this.props.color, top: this.props.x, left: this.props.y }}>
                <div className="top">
                    <span></span>
                </div>
                <div className="butt">
                    <span></span>
                </div>
            </div>
        );
    }
}

export default Apple;
