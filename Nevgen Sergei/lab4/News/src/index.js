const NewsAPI = require('newsapi');
//const newsapi = new NewsAPI('b03230efef814f21bf0df2c274b1966e');
const newsapi = new NewsAPI('08599a8d054844b28e09374e846d669d');
const NO_DATA = "There are no articles matching your request.";
const NEWS_PAGE = 5;

var currentSourse = 0;
var sourcesResponse;
var everythingResponse;
var countNewsThisPage  = 0;

window.onload = function () {
    document.querySelector(".load_more").onclick = loadMore;
    document.querySelector("#filterButton").onclick = filterNews;
};

newsapi.v2.sources().then(response => {
    var count = 0;
    sourcesResponse = response.sources;
    response.sources.forEach(element => {
        var btn = createButton("source_item", count++);

        var span = createSpan("source_item-name", element.name);

        btn.appendChild(span);
        document.querySelector(".sources-list").appendChild(btn);
    });
    console.log(response);
    /*if (response.sources.length !== 0) {
        printNews(response.sources[0]);
    }*/
});

newsapi.v2.topHeadlines({
    category: 'general',
    country: 'ru',
    pageSize: 40
}).then(response => {
    console.log(response);
    everythingResponse = response.articles;
    document.querySelector(".sub-header").innerHTML = "TOP : RU";
    if (everythingResponse.length === 0) {
        document.querySelector(".news").appendChild(createElemNoData());
        hideLoadMore(true);
        return;
    }
    var count = NEWS_PAGE <= response.articles.length ? NEWS_PAGE : response.articles.length;
    addChildNews(0, count, response.articles);
    countNewsThisPage += count;
    hideLoadMore(count === response.articles.length);
});

function hideLoadMore(isThere) {
    if (!isThere) {
        document.querySelector("#container").style.visibility = "visible";
    } else {
        document.querySelector("#container").style.visibility = "hidden";
    }    
}

function createButton(className, count) {
    var btn = document.createElement("button");
    btn.className = className;
    btn.id = count;
    btn.onclick = function(e) {
        e = e || event;
        let target = e.target || e.srcElement;
        console.log(+target.id);
        btnOnClick(+target.id);
    };
    return btn;
}

function btnOnClick(id) {
    countNewsThisPage = 0;
    currentSourse = id;
    document.querySelector("#filterValue").value = null;
    console.log("btnOnClick",sourcesResponse[id]);
    printNews(sourcesResponse[id]);
}

function createSpan(className, innerHTML) {
    var span = document.createElement("span");
    span.className = className;
    span.innerHTML = innerHTML;
    return span;
}

function getNewsQuery(obj, q = "") {
    return newsapi.v2.everything({
        sources: obj.id,
        language: obj.language,
        q   : q,
        pageSize: 40
    })
}

function printNews(obj) {
    document.querySelector(".sub-header").innerHTML = obj.name;
    removeNews();
    getNewsQuery(obj).then(response => {
        everythingResponse = response.articles;
        console.log(everythingResponse);
        if (everythingResponse.length === 0) {
            document.querySelector(".news").appendChild(createElemNoData());
            hideLoadMore(true);
            return;
        }
        var count = NEWS_PAGE <= response.articles.length ? NEWS_PAGE : response.articles.length;
        addChildNews(0, count, response.articles);
        countNewsThisPage += count;
        hideLoadMore(count === response.articles.length);
    });
}

function removeNews() {
    let myNode = document.querySelector(".news");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function addChildNews (start, end, obj) {
    for (let i = start; i < end; i++) {
        document.querySelector(".news").appendChild(createNewsItem(obj[i]));
    }
}

function createNewsItem(obj) {
    var div = document.createElement("div");
    div.className = "news_item";

    div.appendChild(createNewsMeta(obj.urlToImage, obj.author, obj.publishedAt));
    div.appendChild(createNewsDescription(obj.title, obj.source.name, obj.description, obj.url));

    return div;
}

function createNewsMeta(url, author, date) {
    var div = document.createElement("div");
    div.className = "news_meta";
    if (url != null) {
        div.style.cssText = `background-image: url(${url});background-size: 100%;padding-bottom: 10%;`;
    } else {
        div.style.cssText = "height: 0px";
    }
    var ul = document.createElement("ul");
    ul.className = "news_meta-details";

    var li = document.createElement("li");
    li.className = "news_meta-author";
    li.innerHTML = author == null? "" : author;

    ul.appendChild(li);

    var li2 = document.createElement("li");
    li2.className = "news_meta-date";
    li2.innerHTML = date;

    ul.appendChild(li2);
    div.appendChild(ul);
    return div;
}

function createNewsDescription(title, source, description, url) {
    var div = document.createElement("div");
    div.className = "news_description";

    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;

    var h2 = document.createElement("h2");
    h2.className = "news_description-title";
    h2.innerHTML = title;

    var h3 = document.createElement("h3");
    h3.className = "news_description-source";
    h3.innerHTML = source;

    var p = document.createElement("p");
    p.className = "news_description-description";
    p.innerHTML = description;

    a.appendChild(h2);
    a.appendChild(h3);
    a.appendChild(p);
    div.appendChild(a);
    return div;
}

function loadMore() {
    let count = NEWS_PAGE + countNewsThisPage <= everythingResponse.length ?
        NEWS_PAGE + countNewsThisPage : everythingResponse.length;

    addChildNews(countNewsThisPage, count, everythingResponse);
    countNewsThisPage = count;
    hideLoadMore(countNewsThisPage === everythingResponse.length);
}

function filterNews() {
    let value = document.querySelector("#filterValue").value;
    console.log(value);
    if(value === undefined || value == null) {
        document.querySelector(".news").appendChild(createElemNoData());
        return;
    }
    document.querySelector(".sub-header").innerHTML = sourcesResponse[currentSourse].name;
    countNewsThisPage = 0;
    removeNews();
    getNewsQuery(sourcesResponse[currentSourse], value).then(response => {
        everythingResponse = response.articles;
        console.log(everythingResponse);
        if (everythingResponse.length === 0) {
            document.querySelector(".news").appendChild(createElemNoData());
            hideLoadMore(true);
            return;
        }
        var count = NEWS_PAGE <= response.articles.length ? NEWS_PAGE : response.articles.length;
        addChildNews(0, count, response.articles);
        countNewsThisPage += count;
        hideLoadMore( count === response.articles.length);
    });
}

function createElemNoData() {
    var h1 = document.createElement("h1");
    h1.className = "no-data";
    h1.innerHTML = NO_DATA;
    return h1;
}