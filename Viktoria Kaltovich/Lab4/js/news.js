"use strict"

const API_KEY = "8c2a4b8a22e14e04889f9654938a8438"
const PAGES_COUNT = 8
const PER_PAGE = 5
const NO_PHOTO = 'http://www.fsxaddons.com/static/img/no-preview.jpg'

let current_page = 1
let curr_source = 'none'
let curr_text = ''

function createArticle(article) {

   let post = document.createElement('article')
   post.className = "main"

   let postHeader = document.createElement('div')
   let postBody = document.createElement('div')
   postHeader.className = "article-head"
   postBody.className = "article-body"

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


   postBody.appendChild(header)
   postBody.appendChild(publish)
   postBody.appendChild(desc)

   postHeader.appendChild(img)

   post.appendChild(postHeader)
   post.appendChild(postBody)

   return post;
}

function loadNews() {
   let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + API_KEY + '&page=' + (current_page++) + '&pageSize=' + PER_PAGE

   if(curr_text != '') {
      url += '&q=' + curr_text
   }

   if(curr_source != 'none') {
      url += '&sources=' + curr_source
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

         if( (articles.length == 0) || (current_page == (PAGES_COUNT + 1)) ){
            let moreNews = document.getElementById('more_news')
            moreNews.style.display = 'none'
         }   

         if( (articles.length == 0) && (current_page > 1)){ 
            let noNews = document.getElementById('AllNews')
            if(noNews.innerHTML == '') {
               noNews.innerHTML = 'There are no articles matching your request'
            }
         }

      }

   })

}

function loadSources() {
   let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY       

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

   curr_source = searchSource.value
   curr_text = searchInput.value

   loadNews()     
}

let moreNews = document.getElementById('more_news')
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
