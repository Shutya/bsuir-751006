import React from 'react';
import InputButton from '../Header/InputButton';

export default class MoreButton extends React.Component {
    render() {
        if (this.props.visible) {
            return (
                <div className="moreButtonWrapper">
                    <InputButton
                        handleInputClick={this.props.moreButtonClick}
                        buttonStyle="moreButton"
                        >
                        More
                    </InputButton>
                </div>
            );
        } else {
            return null;
        }
    }
}