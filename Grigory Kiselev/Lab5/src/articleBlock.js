import React, { Component } from 'react';
import {render} from 'react-dom';
import Article from './article';

export default class ArticleBlock extends Component {
    constructor()
    {
        super();
    }

    render()
    {
        console.log(this.props);
        if (this.props.articles.length > 0)
        {
            console.log('defined');
            const innerArticles = this.props.articles;
            const htmlarticles = innerArticles.map((x) => <Article article = {x}/>);
            console.log('ArticleList');
            console.log(innerArticles);
            return (
                <div className='article-block'
                    ref = {(block) => {this.articles = block; }} id = "articles">
                    {htmlarticles}
                </div>
            )
        }
        else
        {
            console.log('undefined');
            return (
                <div className='article block'>
                    <p>No results matching your request</p>
                </div>
            )
        }
    }
}