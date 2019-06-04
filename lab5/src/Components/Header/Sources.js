import React from 'react';

export default class Sources extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (

            <div className="sourceFilterWrapper">
                <nav className="sourceFilter">
                    {
                        this.props.sources.map((source) =>
                        <button
                           key={source.id}
                           id={source.id}
                           className={`sourceButton${this.props.toggled.has(source.id) ? " activeFilter" : ""}`}

                           onClick={this.handleClick}
                        >
                         {source.name}
                        </button>
                        )
                    }
                </nav>
            </div>
        );
    }

    handleClick(e) {
        if (e.target.classList.contains("sourceButton")) {
            this.props.toggle(e.target.id);
            this.props.handleInputClick();
        }
    }
}
