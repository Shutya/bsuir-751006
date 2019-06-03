import React, { Component } from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {getNews} from './getNews.js';
import {generateArticle} from './article';
import SourcesBlock from './Sourcesblock';
import "regenerator-runtime/runtime";
import ArticleBlock from './articleBlock';
import { async } from 'regenerator-runtime/runtime';
import SearchForm from './SearchForm';
import LoadMoreButton from './LoadMoreButton';

// function HelloWorld() {
//     var element = React.createElement('h1', null, "you're an allstar");
//     return element;
// }

// var element = React.createElement('h1', null, "you're an allstar");

// ReactDOM.render(element, document.getElementById('root'));

export default class App extends Component
{
    constructor(params) {
        super();
        this.sources = params;
        console.log('APP');
        console.log(this.sources);
        this.sourceref = React.createRef();
        //this.getNews();
        //this.setState({sources : params});
        //console.log(this.state);
        // this.news = async() => {
        //     var response = await getNews(null, null);
        //     this.articles = response.articles;
        //     console.log('news');
        //     console.log(response);
    }

    state = {
        sources : undefined,
        articles : new Array(),
        searchrequest : null,
        sourcechosen : null,
        articlesLoaded : 0,
    }

    gettingNews = async (e) => {
        console.log('getting news called');
        console.log(this.state.sourcechosen);
        const request = e.target.elements.searchrequest.value;
        e.preventDefault();
        var response = undefined;
        console.log(request);
        response = await getNews(this.state.sourcechosen, request, 0);
        //this.setState({searchrequest: request});
        this.state.searchrequest = request;
        this.state.articlesLoaded = 5;
        console.log('getting news');
        console.log(response);
        this.setState({articles : response.articles});
    }

    getNews = async function() {
        const response = await getNews(null, null);
        console.log(response);
        this.setState({
            articles : response.articles,
            searchrequest : null,
            sourcechosen : null,
            articlesLoaded : 5,
        });
    }

    getNewsFromSource = async function() {
        console.log(this.state.sourcechosen);
        const response = await getNews(this.state.sourcechosen, this.state.searchrequest, 0);
        this.setState({articles : response.articles, articlesLoaded : 5});
    }

    loadMoreNews = async () => {
        console.log('load more called');
        console.log(this.state);
        const response = await getNews(this.state.sourcechosen, this.state.searchrequest, this.state.articlesLoaded);
        var currnewsloaded = this.state.articlesLoaded;
        this.state.articles = this.state.articles.concat(response.articles);
        currnewsloaded += 5;
        this.setState({articlesLoaded : currnewsloaded});
    }

    componentDidMount()
    {
        this.getNews();
    }

    render()
    {
        console.log("rendering");
        console.log(this.state);
        console.log(this.state.articles);
        return(
            <div id='main-block'>
                    <div className='navbar'>
                        <div className='col'>
                            <SourcesBlock ref={this.sourceref} setSource = {this.setSource} sources= {this.sources}/>
                        </div>
                        <div className='searchblock'>
                            <SearchForm newsMethod = {this.gettingNews}/>
                        </div>
                    </div>
                    <div className='news'>
                        <ArticleBlock articles = {this.state.articles}/>
                    </div>
                    <div className ='loadmorebutton-div'>
                        <LoadMoreButton ref="loadmorebutton" newsMethod = {this.loadMoreNews} articlesLoaded = {this.state.articlesLoaded}/>
                    </div> 
                    <div>
                        <footer> Powered by NewsAPI </footer>
                    </div>
            </div>
        )
    }

    setSource = () => {
        const source = this.sourceref.current.state.currSource;
        this.state.sourcechosen = source;
        this.getNewsFromSource();
    }
}
