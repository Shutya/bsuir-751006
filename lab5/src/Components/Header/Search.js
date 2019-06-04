import React from 'react';


export default class Search extends React.Component {
   constructor(props) {
      super(props);
      this.handleKeyUp = this.handleKeyUp.bind(this);
   }

    render() {
        return (
            <div className="requestWrapper">
                <div className="Search">
                      <input
                          type="text"
                          className="search__input"
                          onChange={this.props.handleQueryChange}
                          onKeyUp={this.handleKeyUp}
                      />

                    <button
                        className="search__button"
                        id={this.props.id}
                        onClick={this.props.handleRequestExecution}
                    >
                        Search
                    </button>>
                </div>
            </div>
        );
    }

    handleKeyUp(e) {
        e.preventDefault();
        if (e.keyCode === 13)
            this.props.handleRequestExecution();
    }
}
