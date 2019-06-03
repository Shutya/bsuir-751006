"use strict"

const NO_PHOTO = 'https://static.wixstatic.com/media/622c32_bb6e9ca192f3458d93fefbd23f9608c1~mv2.png/v1/crop/x_0,y_0,w_174,h_150/fill/w_201,h_173,al_c,lg_1/622c32_bb6e9ca192f3458d93fefbd23f9608c1~mv2.png'

let current_page = 1
let current_source = 'none'
let current_text = ''

function createArticle(article) {

   let news = document.createElement('article')
   news.className = "main"

   let news_Header = document.createElement('div')
   let news_Body = document.createElement('div')
   news_Header.className = "article-head"
   news_Body.className = "article-body"

   let header = document.createElement('h2')
   let linkHeader = document.createElement('a')
   linkHeader.setAttribute("href", article.url)
   linkHeader.textContent = article.title
   header.appendChild(linkHeader)

   let publish = document.createElement('div')
   let publishData = document.createElement('p')
   let date = new Date(article.publishedAt);
   publish.className = "article-properties"
   publishData.textContent = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() 
                              + ' - ' + (article.author == null ? article.source.name : article.author) + ''
   publish.appendChild(publishData)

   let img = document.createElement('img')
   img.setAttribute("src", article.urlToImage == null ? NO_PHOTO : article.urlToImage)
   img.setAttribute("alt", article.title)
   img.setAttribute("class", "img-preview")

   let desc = document.createElement('p')
   desc.textContent = article.description

   news_Body.appendChild(header)
   news_Body.appendChild(publish)
   news_Body.appendChild(desc)

   news_Header.appendChild(img)

   news.appendChild(news_Header)
   news.appendChild(news_Body)

   return news;
}

function loadNews() {
   let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + "3b5ed23882c84205ac6ec0875162fe8b" + '&page=' + (current_page++) + '&pageSize=' + 7

   if(current_text != '') {
      url += '&q=' + current_text
   }

   if(current_source != 'none') {
      url += '&sources=' + current_source
   }

   let request = new Request(url)
   fetch(request).then(function(response) {
      return response.json();
   }).then(function(json){

      let news = document.getElementById('AllNews')

      let articles = json.articles
      if(json.status) {
         articles.forEach(function(article) {
           news.appendChild(createArticle(article))
         })

         if( (articles.length == 0) || (current_page == (8)) ){
            let moreNews = document.getElementById('load_more')
            moreNews.style.display = 'none'
         }   

         if( (articles.length == 0) && (current_page > 1)){ 
            let noNews = document.getElementById('AllNews')
            if(noNews.innerHTML == '') {
               noNews.innerHTML = '<div style="font-size: 24px; color: white">No articles</div>'
            }
         }
      }
   })

}

function loadSources() {
   let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + "3b5ed23882c84205ac6ec0875162fe8b"      

   let request = new Request(url)
   fetch(request).then(function(response) {
      return response.json();
   }).then(function(json){
      let select = document.getElementById("searchSource");

      if(json.status) {
         let sources = json.sources
         sources.forEach(function(source) {
            let e = document.createElement("option")
            e.textContent = source.name
            e.value = source.id
            select.appendChild(e)
         })
      }
   })
}

function search() {
   let newsContainer = document.getElementById('AllNews')
   let searchInput = document.getElementById('searchInput')
   let searchSource = document.getElementById('searchSource')

   AllNews.innerHTML = ''
   current_page = 1

   current_source = searchSource.value
   current_text = searchInput.value

   loadNews()     
}

let moreNews = document.getElementById('load_more')
moreNews.onclick = function() {
   loadNews()
}

let searchInput = document.getElementById('searchInput')
let searchButton = document.getElementById('searchButton')
let searchSource = document.getElementById('searchSource')

searchSource.onchange = function() {
   search() 
}

searchInput.onkeypress = function(e) {
   if (e.which == 13) {
      search()
   }
}

searchButton.onclick = function() {
   search()
}

loadNews()
loadSources()