import React, { Component } from 'react';

export default class Article extends Component
{
	constructor(params)
	{
		super();
		// this.article = params.article;
		// console.log('Article');
		// console.log(this.article);
	}
	
	render()
	{
		//console.log(this.props);
		return(
			<div className = "article">
						<h2>{this.props.article.title}</h2>
						<p className = "articlesource">{this.props.article.source.name}</p>
						<img src = {this.props.article.urlToImage} className = "newsimage"/> 
						<p className = "description">{this.props.article.description}</p>
						<a href = {this.props.article.url} className = "readmore"> Read more </a>
			</div>
		);
	}
}