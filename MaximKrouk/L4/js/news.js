"use strict"

const API_KEY = "Your API Key";
const NO_PHOTO_IMG = 'https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_2048x.gif';
const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
                    "jul", "aug", "sep", "oct", "nov", "dec"
];
const temp = "no info";
const NEWS_PER_CLICK = 5;

let currentPage = 1;
let currentIndex = 0;
let moreNewsButton = document.getElementById('more-news');
let documentBody = document.getElementById('articles-block');
let sourcesSelect = document.getElementById("sources");
let sourceString = '';
let qString = '';
let searchButton = document.getElementById('find-news');
let noSearchResult = document.getElementById('no-search-results');

function createArticle(articleInfo){
    let article = document.createElement("article");
    article.setAttribute("class", "article-card")
    let tempP;
    
    let title = document.createElement("div");
    title.setAttribute("class", "article-title");
    tempP = document.createElement("a");
    if(articleInfo.title !== null){
        tempP.innerText = articleInfo.title;
    }
    else{
        tempP.innerText = temp;
    }

    tempP.setAttribute('href', articleInfo.url)

    title.appendChild(tempP);

    let image = document.createElement("img");
    image.setAttribute("class", "article-image");
    image.setAttribute("src", articleInfo.urlToImage == null ? NO_PHOTO_IMG : articleInfo.urlToImage);
    image.setAttribute("alt", temp);
    article.appendChild(image);

    let dateBlock = document.createElement("div");
    dateBlock.setAttribute("class", "article-date");
    tempP = document.createElement("p");
    let date = new Date(articleInfo.publishedAt);
    tempP.innerText = (date.getDay() + 1) + ' ' + monthNames[date.getMonth()] + '. ' + 
                      date.getFullYear() + ' y.';
    dateBlock.appendChild(tempP);
    article.appendChild(dateBlock);

    article.appendChild(title);

    return article;
}

function refreshPage(){
    clearArticles();
    fetchNews(API_KEY);
}

function fetchPage(json, pageType){
    console.log(json);
    console.log(pageType);
    if(pageType > 0){
        if(pageType == 2){
            moreNewsButton.style.display = 'none';
        } else{
            moreNewsButton.style.display = 'block';
        }

        noSearchResult.style.display = 'none'; 
        json.articles.forEach((x) => {
            documentBody.appendChild(createArticle(x));
        }
        );
    }
    else{
        noSearchResult.style.display = 'block'; 
        moreNewsButton.style.display = 'none';
    }
   
}

function fetchNews(apiKey){
    let url = getUrl(apiKey);
    console.log(url);
    let req = new Request(url);
    fetch(req).then(function(response) {
            if(200 <= response.status && response.status < 300){
                return response.json();
            }
        }).then(function(json){
            if(!json.totalResults){
                fetchPage(json, 0);
            } else{
                if(json.articles.length < NEWS_PER_CLICK || json.articles.length === 0){
                    fetchPage(json, 2);
                }else{
                    fetchPage(json, 1);
                }
            }
        }) 

}


function fetchSources(){
    let url = 'https://newsapi.org/v2/sources?country=us&apiKey=' + API_KEY;
    console.log(url);
    let req = new Request(url);
    fetch(req).then((response)=>{
        return response.json();
    }).then((json) => {
        let select = document.getElementById('sources');
        json.sources.forEach((x) => {
            let option = document.createElement('option');
            option.value = x.id;
            option.textContent = x.name;
            select.appendChild(option);
        })

    })

}

let searchLine = document.getElementById('search-line');

searchLine.onchange = function search(){
    refreshPage(API_KEY);
}

moreNewsButton.onclick = () => {
   fetchNews(API_KEY);
}

sourcesSelect.onclick = () => {
    refreshPage(API_KEY);
}

function getUrl(apiKey){
    if(sourcesSelect.value !== '')
        sourceString = '&sources=' + sourcesSelect.value;
    qString = '';
    if(searchLine.value !== '')
        qString = '&q=' + searchLine.value;
    return 'https://newsapi.org/v2/top-headlines?language=en&page=' + currentPage++ + '&pageSize=' + NEWS_PER_CLICK + 
               qString + sourceString + '&apiKey=' + apiKey;
}

function clearArticles(){
    while (documentBody.firstChild) {
        documentBody.firstChild.remove();
    }
    currentPage = 1;
}

fetchSources();
fetchNews(API_KEY);
