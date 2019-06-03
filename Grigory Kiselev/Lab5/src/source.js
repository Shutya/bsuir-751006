import React from 'react';
import {Component} from 'react';

export default class Source extends Component {
    constructor(params) {
        super();
        this.source = params.source;
        this.changeSource = params.changeSource;
    }

    render()
    {
        if (this.props.currSourceName == this.source.name)
        {
            return <div className="selected-source-div" onClick={this.onClick}>{this.source.name}</div>
        }
        else
        {
            return <div className="source-div" onClick={this.onClick}>{this.source.name}</div>
        }
    }

    onClick = () => {
        this.changeSource(this.source);
    }
}