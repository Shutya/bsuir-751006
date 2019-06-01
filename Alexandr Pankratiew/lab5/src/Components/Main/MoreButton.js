import React from 'react';

export default class MoreButton extends React.Component {
    render() {
        if (this.props.visible) {
            return (
                <div className="moreButtonWrapper">
                   <button
                      className="next-news"
                      onClick={this.props.moreButtonClick}
                   >
                      More
                  </button>
                </div>
            );
        } else {
            return null;
        }
    }
}
