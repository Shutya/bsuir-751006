"use strict";

const API_KEY = "ac04d439a1d04b3f998d212dee14c4cf";
const MAX_PAGES = 8;
const PER_PAGE = 6;
const NO_PHOTO = 'https://qrmart.com.sg/images/noimagefound.jpg';

let current_page = 1;
let curr_source = 'none';
let curr_text = '';

let moreNews = document.getElementById('more_news');
moreNews.onclick = function() {
   getNews()
};

let searchButton = document.getElementById('searchButton');
searchButton.onclick = function() {
   search()
};

getNews();
getSites();

function getNews() {
   let url = 'https://newsapi.org/v2/top-headlines?language=ru&apiKey=' + API_KEY + '&page=' + (current_page++) + '&pageSize=' + PER_PAGE;
   if(curr_text !== '') {
      url += '&q=' + curr_text
   }
   if(curr_source !== 'none') {
      url += '&sources=' + curr_source
   }

   let request = new Request(url);
   fetch(request)
      .then(function(response) {
      return response.json();
   })
      .then(function(json){
         let news = document.getElementById('NewsContainer');
         let articles = json.articles;
         if(json.status) {
            articles.forEach(function(article) {
              news.appendChild(presentNewsItem(article))
            });
            if( (articles.length === 0) || (current_page > (MAX_PAGES)) ){
               let moreNews = document.getElementById('more_news');
               moreNews.style.display = 'none'
            } else {
               let moreNews = document.getElementById('more_news');
               moreNews.style.display = 'block'
            }
            if( (articles.length === 0) && (current_page > 1)){
               let noNews = document.getElementById('NewsContainer');
               if(noNews.innerHTML === '') {
                  noNews.innerHTML = 'There are no articles matching your request';
               }
            }
         }
      });
}

function getSites() {
   let url = 'https://newsapi.org/v2/sources?country=ru&language=ru&apiKey=' + API_KEY;

   let request = new Request(url);
   fetch(request)
      .then(function(response) {
         return response.json();
      })
      .then(function(json){
         let select = document.getElementById("searchSource");
         if(json.status) {
            let sources = json.sources;
            sources.forEach(function(source) {
               let e = document.createElement("option");
               e.textContent = source.name;
               e.value = source.id;
               select.appendChild(e)
            })
         }
      })
}


function search() {
   let newsContainer = document.getElementById('NewsContainer');
   let searchInput = document.getElementById('searchInput');
   let searchSource = document.getElementById('searchSource');

   newsContainer.innerHTML = '';
   current_page = 1;
   curr_source = searchSource.value;
   curr_text = searchInput.value;

   getNews()
}

function presentNewsItem(article) {
   let item = document.createElement('article');
   item.className = "main";

   let newsHeader = document.createElement('div');
   newsHeader.className = "article-head";

   let newsBody = document.createElement('div');
   newsBody.className = "article-body";

   let linkHeader = document.createElement('a');
   linkHeader.setAttribute("href", article.url);
   linkHeader.textContent = article.title;

   let title = document.createElement('h2');
   title.appendChild(linkHeader);

   let publisherInfo = document.createElement('p');
   publisherInfo.textContent = (article.author == null ? article.source.name : article.author);

   let publish = document.createElement('div');
   publish.className = "article-properties";

   publish.appendChild(publisherInfo);
   newsHeader.appendChild(title);
   newsHeader.appendChild(publish);

   let img = document.createElement('img');
   img.setAttribute("src", article.urlToImage == null ? NO_PHOTO : article.urlToImage);
   img.setAttribute("alt", article.title);
   img.setAttribute("class", "img-preview");

   let desc = document.createElement('p');
   desc.textContent = article.description;

   newsBody.appendChild(desc);
   newsBody.appendChild(img);

   item.appendChild(newsHeader);
   item.appendChild(newsBody);
   return item;
}
