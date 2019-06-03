import React from 'react';
import {Component} from 'react';

export default class LoadMoreButton extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.articlesLoaded < 40)
        {
            return (<button onClick = {this.props.newsMethod} className='loadmorebutton'>Load more</button>);
        }
        else
        {
            return (<p className='everythingloaded'> All news have been loaded </p>);
        }
    }
}