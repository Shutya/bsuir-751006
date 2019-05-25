"use strict"
const MAX_PAGE = 17
const PAGE_SIZE = 5

let current_page = 1
let curr_source = 'none'
let curr_text = ''
GetNews()
GetSources()
var news = document.getElementById('more_news')
news.onclick = function() {
	current_page=current_page+1;
	if(current_page<MAX_PAGE)
	{
		GetNews()
	}
	else
	{
		alert('Выведено 40 новостей')
	}
   
}

var searchButton = document.getElementById('search__button')
searchButton.onclick = function() {
   SearchForNews()
}


function GetSources() {
   let url = 'https://newsapi.org/v2/' + 'sources?' +'country=us&' +'language=en&' +'apiKey=' + "b3d9ea7b5ca64870947cdc32af104145";

   let req = new Request(url)
   fetch(req).then(function(response) {
      return response.json()
   }).then(function(json){
      let select = document.getElementById("filter_source");

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

function renderNewsItem(article) {
   let item = document.createElement('div')
   item.className = "news__item"

   let card = document.createElement('div')
   card.className = "news_image"

   let img = document.createElement('img')
   img.setAttribute("src", article.urlToImage == null ? NO_PHOTO_URL : article.urlToImage)
   img.setAttribute("alt", article.title)
   card.appendChild(img)

   let capt = document.createElement('div')
   capt.className = "news__item__caption"

   let captMiddle = document.createElement('div')
   captMiddle.className = "news-middle"
   capt.appendChild(captMiddle)

   let author = document.createElement('h4')
   author.textContent = article.author == null ? article.source.name : article.author
   captMiddle.appendChild(author)

   let time = document.createElement('p')
   time.textContent = article.publishedAt
   captMiddle.appendChild(time)

   card.appendChild(capt)
   item.appendChild(card)

   let cont = document.createElement('div')
   cont.className = "NewsDescription"

   let title = document.createElement('h2')
   title.textContent = article.title
   cont.appendChild(title)

   let text = document.createElement('p')
   text.textContent = article.content
   cont.appendChild(text)

   let source = document.createElement('div')
   source.className = 'Source'
   source.textContent = article.source.name
   if(source.textContent.length > 12) {
      source.style.fontSize = "30px"
   }
   cont.appendChild(source)

   item.appendChild(cont)

   item.onclick = function() {
      window.open(article.url, '_blank');
   }

   return item;
}


function GetNews() {
   let url = 'https://newsapi.org/v2/' + 'top-headlines?' +'language=en&' +'apiKey=' + "b3d9ea7b5ca64870947cdc32af104145" + "&" +'page=' + current_page++ + '&' +'pageSize=' + PAGE_SIZE;

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
			alert('Нет подходящих новостей!')
            news.style.display = 'none'
			return;
         }

         if(articles.length == 0 && current_page == 2) {
            let warning = document.getElementById('warning')
			alert('нет подходящих новостей');
            if(warning.innerHTML == '') {
               warning.innerHTML = 'Нет подходящиъ новостей'
			   warning.style.display='block'
            }
         }
      }
   })
}

function SearchForNews() {
   let news = document.getElementById('news')
   news.innerHTML = ''
   current_page = 1
   curr_source = document.getElementById('filter_source').value
   curr_text = document.getElementById('search__input').value

   GetNews()
}

