import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {getNews} from './getNews.js';
import {generateArticle} from './article';
import "regenerator-runtime/runtime";
import App from './App.js';
import { getSources } from './getSources.js';

// function HelloWorld() {
//     var element = React.createElement('h1', null, "you're an allstar");
//     return element;
// }

// var element = React.createElement('h1', null, "you're an allstar");

// ReactDOM.render(element, document.getElementById('root'));
async function main()
{
    //var response = await getNews(null, null);
    var response = await getSources();
    //console.log(response.sources);
    ReactDOM.render(<App params = {response}/>, document.getElementById('root'));
    // console.log(generateArticle(response.articles[0]));
    // var element = generateArticle(response.articles[0]);
    // ReactDOM.render(element, document.getElementById('root'));
}

main();
