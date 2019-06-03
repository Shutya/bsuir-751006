"use strict"

// Ключ, к-во стр, новстей на стр, нет картинки и элемент новостей
const API_KEY = "81d58ce9c0fa481185db597843e87b78";
const PAGES_COUNT = 10;
const PER_PAGE = 5;
const NO_PHOTO = 'http://www.fsxaddons.com/static/img/no-preview.jpg';
const  el =  React.createElement

let current_page = 1;
let curr_source = 'none';
let curr_text = '';
let last_page = 0;

// Создание статьи
class News extends React.Component {
   constructor() {
      super();
      this.state = { data: null};
   }
   createCart(article) {
      var published = new Date(article.publishedAt);
      var publishDate = published.getDate() + '.' + (published.getMonth() + 1) + '.' + published.getFullYear() 
                              + ' ' + published.getHours() + ':' + published.getMinutes() 
                              + ' (' + ( ( (article.author == null) || (article.author.length > 30) ) ? article.source.name : article.author) + ')'   
       let date = el('p', 
         {
            key: Math.floor(Math.random() * 10000)
         },  
         publishDate
      );
       let dateContainer = el('div', 
            {
               key: Math.floor(Math.random() * 10000),
               className: "article-properties"
            },  
            [date] 
       );
       let link = el('a', 
            {
               target: '_blank',
               key: Math.floor(Math.random() * 10000),
               href: article.url
            },  
            article.title
       );
       let title = el('h2', 
            {
               key: Math.floor(Math.random() * 10000)
            },  
            [link]
       );
       let img = el('img', 
            {
               key: Math.floor(Math.random() * 10000),
               src: article.urlToImage == null ? NO_PHOTO : article.urlToImage , 
               className: "img-preview",
               alt: article.title               
            },  
            null
       );
       let description = el('p', 
            {
               key: Math.floor(Math.random() * 10000)
            },  
            article.description
       );
       let head = el('div', 
            { 
               key: Math.floor(Math.random() * 10000),
               className: "article-head"
            },  
            [img]
       );
       let body = el('div', 
            {
               key: Math.floor(Math.random() * 10000),
               className: "article-body"
            },  
            [title, dateContainer,, description]
       );
       let cart = el('article', 
            { 
               key: Math.floor(Math.random() * 10000),
               className: "main"
            },  
            [head, body]
       );
       return cart;
   }

   async loadNews(){
      if(last_page != current_page){
         last_page = current_page
         let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + API_KEY +  '&pageSize=' + (PER_PAGE * current_page);
            if(curr_text != '') {
               url += '&q=' + curr_text
            }
            if(curr_source != 'none') {
               url += '&sources=' + curr_source
            }
            let request = await fetch(url)
            let requestJSON = await request.json()
            let newsList = [];
            let articles = requestJSON.articles
            if( (articles.length == 0) && (current_page == 1)){ 
               newsList.push( el('p', 
                           { 
                              key: Math.floor(Math.random() * 10000)
                           },  
                           'No articles'
                     )
               )
            } else {
               for (let i = 0, len = articles.length; i < len; i++) {
               newsList.push( this.createCart(articles[i]) );
            }
            }
            this.setState({
               data: newsList
            })
            var moreNews = document.getElementById('more_news')
            if( (articles.length < (PER_PAGE * current_page) ) || (current_page == PAGES_COUNT) ){
               moreNews.style.display = 'none'
            } else {
               moreNews.style.display = 'block'
            }
         return news
      } else {
         return null
      }
   }
   shouldComponentUpdate() {
      this.loadNews();
      return true
   }
   componentWillMount() {
      this.loadNews();
   }
   render() {
      return this.state.data;
   }
}

function GetNews() {
   ReactDOM.render(
      React.createElement(News, null, null),
      document.getElementById('NewsContainer')
   );
}

function search() {
   current_page = 1
   last_page = 0
   var searchInput = document.getElementById('searchInput')
   var searchSource = document.getElementById('searchSource')
   curr_source = searchSource.value
   curr_text = searchInput.value
   GetNews()
}

async function sources() {
   let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY   
   let request = await fetch(url)
   let requestJSON = await request.json()
   let sources = requestJSON.sources
   let ArrayOfSources = []
   ArrayOfSources.push( 
        el('option', 
         {
            key: Math.floor(Math.random() * 10000),
            value: 'none'
         },  
         'Editions'
      )
    );
      for (let i = 0, len = sources.length; i < len; i++) {
         ArrayOfSources.push( 
               el('option', 
               {
                  key: Math.floor(Math.random() * 10000),
                  value: sources[i].id
               },  
               sources[i].name
            )
            );
      }
   ReactDOM.render(
         el('select', {
            onChange: () => { 
               search()
            },
            key: Math.floor(Math.random() * 10000),
            id: 'searchSource',
            name: 'searchSource'
         }, 
         ArrayOfSources ),
         document.getElementById('selection')
   );

}

function Control() {
   ReactDOM.render(
      el('input', {
               onKeyPress: (e) => { 
                   if (e.which == 13) {
                       search()
                   }
               },
               placeholder: "Find...",
               key: Math.floor(Math.random() * 10000),
               id: 'searchInput'
           }, 
           null),
      document.getElementById('search')
   );
   ReactDOM.render(
      el('button', {
            onClick: () => { search() },
            key: Math.floor(Math.random() * 10000),
            id: 'searchButton'
           }, 
           'Search'),
      document.getElementById('BSearch')
   );
   ReactDOM.render(
      el('button', {
            onClick: () => { 
                   current_page++
                   GetNews()
               },
               key: Math.floor(Math.random() * 10000),
               id: 'more_news'
           }, 
           'Load more'),
      document.getElementById('load_more')
   );
}

sources()
GetNews()
Control()