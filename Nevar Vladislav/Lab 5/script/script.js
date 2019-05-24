"use strict"

const  e =  React.createElement

const API_KEY = "8c2a4b8a22e14e04889f9654938a8438"
const API_DOMAIN = 'https://newsapi.org/v2/'

const MAX_PAGE = 8
const PAGE_SIZE = 5

const NO_PHOTO_URL = 'http://classifieds.parkrecord.com/public/images/no-photo.png'

let current_page = 1
let curr_source = 'none'
let curr_text = ''

let news_list = []

function renderNewsItem(article) {
   let img = e('img',
      {
         key: Math.floor(Math.random() * 10000),
         src: article.urlToImage == null ? NO_PHOTO_URL : article.urlToImage,
         alt: article.title
      },
      null
   )

   let captMiddle = e('div',
      {
         key: Math.floor(Math.random() * 10000),
         className:"news-middle",
      },
      null
   );

   let capt = e('div',
      {
         key: Math.floor(Math.random() * 10000),
         className:"news__item__caption"
      },
      captMiddle
   )

   let card = e('div',
      {
         key: Math.floor(Math.random() * 10000),
         className: "news__item__card",
      },
      [img, capt]
   )

   let title = e('a',
      {
         target: '_blank',
         key: Math.floor(Math.random() * 10000),
         href: article.url
      },
      article.title
   )

   let text = e('p',
      {
         key: Math.floor(Math.random() * 10000),
      },
      article.content
   )

   let source = e('h4',
      {
         key: Math.floor(Math.random() * 10000),
         className: 'source',
         fontSize: "14px"
      },
      article.source.name
   )

   let author = e('h4', 
      {
         key: Math.floor(Math.random() * 10000),
         fontSize:"14px",
         className:'author'
      },
      article.author == null ? article.source.name : article.author
   )

   let time = e('h4',
      {
         key: Math.floor(Math.random() * 10000),
         fontSize: "14px"
      },
      article.publishedAt
   )

   let block = e('div',
      {
         key: Math.floor(Math.random() * 10000),
         className:'vsetoline',
      },
      [author, time, source]
   )

   let cont = e('div',
      {
         key: Math.floor(Math.random() * 10000),
         className: "news__description"
      },   
      [title, text, block]
   )

   let item = e('div',
      {
         key: Math.floor(Math.random() * 10000),
         className: "news__item"
      },
      [card, cont]
   )

news_list.push(item);
}

async function fillNews() {
   let url = API_DOMAIN + 'top-headlines?' +
          'language=en&' +
          'apiKey=' + API_KEY + "&" +
          'page=' + current_page + '&' +
          'pageSize=' + PAGE_SIZE

   if(curr_text != '') {
      url += '&q=' + curr_text
   }

   if(curr_source != 'none') {
      url += '&sources=' + curr_source
   }

   fetch(new Request(url))
      .then(response => response.json())
      .then(json => {

         let news = document.getElementById('news');

         if (json.status) {
            json.articles.forEach(article => renderNewsItem(article));

            ReactDOM.render(
               React.createElement('div', {key: Math.floor(Math.random() * 10000)}, news_list),
               news
            )

            if (json.articles.length == 0 || current_page >= MAX_PAGE + 1) {
               let news_button = document.getElementById('next-news');
               news_button.style.display = 'none';
            }
            if (json.articles.length == 0 && news_list.length == 0) {
               ReactDOM.render(
                  React.createElement('div', {key: Math.floor(Math.random() * 10000)}, 'There are no articles matching your request'),
                  news
               )
               }
            }
         }
      )
}

async function loadSources() {
   let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY   
   let request = await fetch(url)
   let requestJSON = await request.json()
   let sources = requestJSON.sources
      let listOfSources = []

      listOfSources.push( 
      e('option', 
         {
            key: Math.floor(Math.random() * 10000),
            value: 'none'
         },  
         'Все издания'
      )
   );

      for (let i = 0, len = sources.length; i < len; i++) {
      listOfSources.push( 
               e('option', 
               {
                  key: Math.floor(Math.random() * 10000),
                  value: sources[i].id
               },  
               sources[i].name
            )
            );
   }

   ReactDOM.render(
         React.createElement('select', {
                           onChange: () => { 
                                 search()
                              },
                           key: Math.floor(Math.random() * 10000),
                           id: 'searchSource',
                           name: "search-source",
                           id: "search_source",
                           className:"search_source"
                        }, 
                        listOfSources ),
         document.getElementById('selection')
);

return listOfSources
}

function makeSearch() {

   current_page = 1
   news_list = [];

   let news = document.getElementById('next-news')
   news.style.display = 'inline';

   curr_source = document.getElementById('search_source').value
   curr_text = document.getElementById('search_input').value

   fillNews()
}

let news = document.getElementById('next-news')
news.onclick = function() {
   current_page++;
   fillNews()
}

let newsInput = document.getElementById('search_input')
newsInput.onkeypress = function(e) {
   if (e.which == 13) {
      makeSearch()
   }
}

let searchButton = document.getElementById('search_button')
searchButton.onclick = function() {
   makeSearch()
}

fillNews()
loadSources()

