import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import './images/img1.jpg';
//import './images/banner.png';

import SourceList  from './SourceList.js';
import NewsList from './NewsList.js';

let  lastUsedUrl = '';
let page = 0;
let alreadyNewsDisplayed = 0;
let newsInfo = [];
const loadButton = '#main-load-bn';
const errorLabel = '#main-errorLabel';
const API_KEY = "38f6b3ab94ad406db0b847023741dc13"
const API_DOMAIN = 'https://newsapi.org/v2/'

let view = {
    hideElement:  (element) => {
        document.querySelector(element).style.display = 'none';
    },

    showElement : (element) => {
        document.querySelector(element).style.display = 'unset';
    }
}

let controller =  {

    loadSources : () => {
        const url = `${API_DOMAIN}/sources?apiKey=${API_KEY}&language=en&country=us`;
        const request = new Request(url);
        fetch(request)
            .then( (response) => response.json())
            .then(
                (data) => {
                    ReactDOM.render((<>
                       <option value="none" selected>Any source</option>
                       <SourceList sourceList= {data.sources}/>
                       </>), document.getElementById('main-sources')
                    );
                }
            );
    },

    loadNewsByUrl : (urlPart) => {
        view.hideElement(loadButton);
        view.hideElement(errorLabel);
        const url = `${API_DOMAIN}/${urlPart}apiKey=${API_KEY}`;
        const request = new Request(url);
        fetch(request)
            .then( (response) => response.json())
            .then((data) => {
                let newsCount = data.articles.length;
                if(newsCount === 0){
                    view.showElement(errorLabel);
                    view.hideElement(loadButton);
                    newsInfo = [];
                    model.createNewsBlock(newsInfo);
                    return;
                }
                newsInfo = data.articles;
                model.createNewsBlock(data.articles);
                if (newsCount < 5)
                    view.hideElement(loadButton);
                else
                    view.showElement(loadButton);

                lastUsedUrl = url;
                page = 2;
                alreadyNewsDisplayed = newsCount;
            });
    },

    appendNews: () => {
        lastUsedUrl = lastUsedUrl.replace(new RegExp('page=.*&'), `page=${page}&`);
        console.log(lastUsedUrl);
        const request = new Request(lastUsedUrl);

        fetch(request)
            .then( (response) => response.json() )
            .then(
                (data) => {
                    let newsCount = data.articles.length;
                    if(newsCount === 0) {
                        view.hideElement(loadButton);
                        return;
                    }
                    newsInfo = newsInfo.concat(data.articles);
                    model.createNewsBlock(newsInfo);

                    alreadyNewsDisplayed += newsCount;
                    page++;

                    if(newsCount < 5 || alreadyNewsDisplayed === 40){
                        view.hideElement(loadButton);
                    }
            });
    }
}

let model = {
    createNewsBlock : ( data) =>{
        ReactDOM.render(<NewsList newsList={data}/>,document.getElementById('news'));
    }
}

controller.loadSources();

document.querySelector(loadButton).addEventListener('click', () => {
    controller.appendNews();
  });

document.querySelector('#main-sources').addEventListener('click', (event) =>{
    let target = document.getElementById('main-sources').value
    if(target == 'none') {
      controller.loadNewsByUrl(`top-headlines?language=en&pageSize=5&page=1&`);
   } else {
      controller.loadNewsByUrl(`top-headlines?sources=${target}&pageSize=5&page=1&`);
   }

});

document.querySelector('#main-search-bn').addEventListener('click',
    () => {
        if(document.querySelector('#main-search-input').value.length > 0){
           let target = document.getElementById('main-sources').value
           if(target == 'none') {
             controller.loadNewsByUrl(`top-headlines?q=${document.querySelector('#main-search-input').value}&pageSize=5&page=1&`);
          } else {
            controller.loadNewsByUrl(`top-headlines?q=${document.querySelector('#main-search-input').value}&sources=${target}&pageSize=5&page=1&`);
         }
    }
});

document.querySelector('#main-search-input').addEventListener('keyup',
    (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector('#main-search-bn').click();
    }
});

controller.loadNewsByUrl(`top-headlines?language=en&pageSize=5&page=1&`);
