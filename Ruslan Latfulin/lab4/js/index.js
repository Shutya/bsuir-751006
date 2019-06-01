const API_KEY = "64c5982dc16e4e7ea3a2acbeb7fe043e";
const PAGES_COUNT = 8
const PER_PAGE = 5
const NO_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

let currentPage = 1
let currentPublisher = 'none'
let currentText = '';

function createArticle(article) {
    let post = document.createElement('article')
    post.className = "main"
 
    let head = document.createElement('div')
    let body = document.createElement('div')
    head.className = "article-head"
    body.className = "article-body"
 
    let header = document.createElement('h2')
    let linkHeader = document.createElement('a')
    linkHeader.setAttribute("href", article.url)
    linkHeader.textContent = article.title
    header.appendChild(linkHeader)
 
    let publisher = document.createElement('div')
    let publishData = document.createElement('p')
    let date = new Date(article.publishedAt);
    publisher.className = "article-properties"
    publishData.textContent = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() 
                               + ' - ' + (article.author == null ? article.source.name : article.author) + ''
    publisher.appendChild(publishData)
 
    let image = document.createElement('img')
    image.setAttribute("src", article.urlToImage == null ? NO_PHOTO : article.urlToImage)
    image.setAttribute("alt", article.title)
    image.setAttribute("class", "img-preview")
 
    let description = document.createElement('p')
    description.textContent = article.description
 
    body.appendChild(header)
    body.appendChild(publisher)
    body.appendChild(description)

    head.appendChild(image)

    post.appendChild(head)
    post.appendChild(body)
 
    return post;
}

function loadNews() {
    let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + API_KEY + '&page=' + (currentPage++) + '&pageSize=' + PER_PAGE

   if(currentText != '') {
      url += '&q=' + currentText;
   }

   if(currentPublisher != 'none') {
      url += '&sources=' + currentPublisher
   }

    let request = new Request(url);
    fetch(request).then(response => {
        return response.json();
    }).then(function(json) {

        let news = document.getElementById('News');

        let articles = json.articles;
        if (json.status) {
            articles.forEach(article => {
                news.appendChild(createArticle(article));
            });

            if((articles.length == 0) || (currentPage == (PAGES_COUNT + 1)) ){
                let moreNews = document.getElementById('more')
                moreNews.style.display = 'none'
            }
            
            if((articles.length == 0) && (currentPage > 1)) {
                let noNews = document.getElementById('News');
                if (noNews.innerHTML == '') {
                    noNews.innerHTML = 'There are no articles matching your request'
                }
            }
        }
    })
}

function loadPublishers() {
    let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY       

   let request = new Request(url)
   fetch(request).then(response => {
      return response.json();
   }).then(json => {
      let select = document.getElementById("search-source");

      if(json.status) {
         let sources = json.sources;
         sources.forEach(source => {
            let e = document.createElement("option");
            e.textContent = source.name;
            e.value = source.id;
            select.appendChild(e);
         })
      }
   })
}

function search() {
    let searchInput = document.getElementById('search-input');
    let searchSource = document.getElementById('search-source');
    News.innerHTML = '';
    currentPage = 1;
    currentPublisher = searchSource.value;
    currentText = searchInput.value;
 
    loadNews();    
}

let moreNews = document.getElementById('more')
moreNews.onclick = function() {
   loadNews();
}

let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('button-search');
let searchSource = document.getElementById('search-source');

searchSource.onchange = () => {
   search();
}

searchInput.onkeypress = e => {
   if (e.which == 13) {
      search();
   }
}

searchButton.onclick = () => {
   search();
}

loadNews();
loadPublishers();
