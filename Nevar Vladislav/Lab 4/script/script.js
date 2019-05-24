"use strict"

const API_KEY = "39b8f5ed1e64480e8ed382c73661ed5b"
const API_DOMAIN = 'https://newsapi.org/v2/'

const MAX_PAGE = 8
const PAGE_SIZE = 5

const NO_PHOTO_URL = 'http://classifieds.parkrecord.com/public/images/no-photo.png'

let current_page = 1
let curr_source = 'none'
let curr_text = ''


function renderNewsItem(article) {
   let item = document.createElement('div')
   item.className = "news__item"

   let card = document.createElement('div')
   card.className = "news__item__card"

   let img = document.createElement('img')
   img.setAttribute("src", article.urlToImage == null ? NO_PHOTO_URL : article.urlToImage)
   img.setAttribute("alt", article.title)
   card.appendChild(img)

   let capt = document.createElement('div')
   capt.className = "news__item__caption"

   let captMiddle = document.createElement('div')
   captMiddle.className = "news-middle"
   capt.appendChild(captMiddle)

   card.appendChild(capt)
   item.appendChild(card)

   let cont = document.createElement('div')
   cont.className = "news__description"

   let title = document.createElement('h2')
   title.textContent = article.title
   cont.appendChild(title)

   let text = document.createElement('p')
   text.textContent = article.content
   cont.appendChild(text)

   let block = document.createElement('div')
   block.className = 'vsetoline'
   
   let source = document.createElement('h4')
   source.className = 'source'
   source.textContent = article.source.name
   source.style.fontSize = "14px"

   let author = document.createElement('h4')
   author.textContent = article.author == null ? article.source.name : article.author
   author.style.fontSize = "14px"
   author.className = 'author'
   block.appendChild(author);


   let time = document.createElement('h4')
   time.textContent = article.publishedAt
   time.style.fontSize = "14px"
   block.appendChild(time)


   block.appendChild(source)

   cont.appendChild(block)

   item.appendChild(cont)

   item.onclick = function() {
      window.open(article.url, '_blank');
   }

   return item;
}

function fillSources() {
   let url = API_DOMAIN + 'sources?' +
          'country=us&' +
          'language=en&' +
          'apiKey=' + API_KEY

   let req = new Request(url)
   fetch(req).then(function(response) {
      return response.json()
   }).then(function(json){
      let select = document.getElementById("search_source");

      if(json.status) {
         let sources = json.sources
         sources.forEach(function(source) {
            let el = document.createElement("option")
            el.textContent = source.name
            el.value = source.id
            select.appendChild(el)
         })
      }
   })
}

function fillNews() {
   let url = API_DOMAIN + 'top-headlines?' +
          'language=en&' +
          'apiKey=' + API_KEY + "&" +
          'page=' + current_page++ + '&' +
          'pageSize=' + PAGE_SIZE

   if(curr_text != '') {
      url += '&q=' + curr_text
   }

   if(curr_source != 'none') {
      url += '&sources=' + curr_source
   }

   let req = new Request(url)
   fetch(req).then(function(response) {
      return response.json();
   }).then(function(json){
      let news = document.getElementById('news')

      let articles = json.articles
      if(json.status) {
         articles.forEach(function(article) {
           news.appendChild(renderNewsItem(article))
         })

         if(articles.length == 0 || current_page == MAX_PAGE + 1) {
            let news = document.getElementById('next-news')
            news.style.display = 'none'
         }

         if(articles.length == 0 && current_page == 2) {
            let news = document.getElementById('news')

            if(news.innerHTML == '') {
               news.innerHTML = 'There are no articles matching your request'
            }
         }
      }
   })
}

function makeSearch() {
   let news = document.getElementById('news')
   news.innerHTML = ''

   current_page = 1

   curr_source = document.getElementById('search_source').value
   curr_text = document.getElementById('search_input').value

   fillNews()
}

let news = document.getElementById('next-news')
news.onclick = function() {
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
fillSources()
