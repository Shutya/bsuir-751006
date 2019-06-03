"use strict";

const NO_PHOTO = 'https://static.wixstatic.com/media/622c32_bb6e9ca192f3458d93fefbd23f9608c1~mv2.png/v1/crop/x_0,y_0,w_174,h_150/fill/w_201,h_173,al_c,lg_1/622c32_bb6e9ca192f3458d93fefbd23f9608c1~mv2.png'
const  el =  React.createElement
let current_page = 1
let curr_source = 'none'
let curr_text = ''
let last_page = 0

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
         let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + "3b5ed23882c84205ac6ec0875162fe8b" +  '&pageSize=' + (8 * current_page);
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
            if( (articles.length < (8 * current_page) ) || (current_page == 10) ){
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
      document.getElementById('AllNews')
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
   let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + "3b5ed23882c84205ac6ec0875162fe8b"   
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
         'All editions'
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
               placeholder: "Search...",
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
      document.getElementById('button_search')
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
      document.getElementById('button_more')
   );
}

sources()
GetNews()
Control()