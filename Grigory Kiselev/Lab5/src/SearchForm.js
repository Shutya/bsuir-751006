import React, { Component } from 'react';

export default class SearchForm extends Component {
    constructor(params)
    {
        super();
    }

    render()
    {
        return (
            <form onSubmit ={this.props.newsMethod} className="searchbar">
                <input type="text" name="searchrequest" placeholder="request"/>
                <button> Search </button>
            </form>
        );
    }
}