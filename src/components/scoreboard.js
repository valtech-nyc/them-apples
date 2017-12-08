import React from 'react';
import PropTypes from 'prop-types';

export default class scoreboard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            btnLabel: props.moreTextLabel,
            isVisible: false
        };
        this.toggleText = this.toggleText.bind(this);
    }

    render() {

        return (
            <div>
                [scoreboard goes here]
            </div>
        );
    }

    toggleText() {
        this.setState({
            isVisible: !(this.state.isVisible)
        });
    }

     renderChildren(props) {
      return React.Children.map(props.children, child => {
        if (child.type === RadioOption)
          return React.cloneElement(child, {
            name: props.name
          })
        else
          return child
      })
    }

}
ExpandText.PropTypes = {
    children: PropTypes.string.isRequired
};

ExpandText.defaultProps = {
    moreTextLabel: 'View More...',
    lessTextLabel: 'View Less...'
};
