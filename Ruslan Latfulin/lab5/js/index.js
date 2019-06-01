'use strict';

const e = React.createElement;
const API_KEY = "a453c069a0eb4169948ab066219168f4";
const PAGES_COUNT = 8
const PER_PAGE = 5
const NO_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

let currentPage = 1
let currentPublisher = 'none'
let currentText = '';
let lastPage = 0;

class NewsGenerator extends React.Component {

	constructor() {
    	super();
    	this.state = { data: null};
  	}

	createCart(article) {
  
		var published = new Date(article.publishedAt);
		var publishDate = published.getDate() + '.' + (published.getMonth() + 1) + '.' + published.getFullYear() 
                              + ' ' + published.getHours() + ':' + published.getMinutes() 
                              + ' (' + ( ( (article.author == null) || (article.author.length > 30) ) ? article.source.name : article.author) + ')'   
                                              
	    let date = e('p', 
			{
				key: Math.floor(Math.random() * 10000)
			},  
			publishDate
		);

	    let dateContainer = e('div', 
	      	{
	      		key: Math.floor(Math.random() * 10000),
	      		className: "article-properties"
	      	},  
	      	[date] 
	    );

	    let link = e('a', 
	      	{
	      		target: '_blank',
	      		key: Math.floor(Math.random() * 10000),
	      		href: article.url
	      	},  
	      	article.title
	    );
	    let title = e('h2', 
	      	{
	      		key: Math.floor(Math.random() * 10000)
	      	},  
	      	[link]
	    );

	    let head = e('div', 
	      	{ 
	      		key: Math.floor(Math.random() * 10000),
	      		className: "article-head"
	      	},  
	      	[title, dateContainer]
	    );

	    let description = e('p', 
	      	{
	      		key: Math.floor(Math.random() * 10000)
	      	},  
	      	article.description
	    );

	    let img = e('img', 
	      	{
	      		key: Math.floor(Math.random() * 10000),
	      		src: article.urlToImage == null ? NO_PHOTO : article.urlToImage , 
	      		className: "img-preview",
	      		alt: article.title	      		
	      	},  
	      	null
	    );

	    let body = e('div', 
	      	{
	      		key: Math.floor(Math.random() * 10000),
	      		className: "article-body"
	      	},  
	      	[img, description]
	    );

	    let cart = e('article', 
	      	{ 
	      		key: Math.floor(Math.random() * 10000),
	      		className: "main"
	      	},  
	      	[head, body]
	    );
 
	    return cart;
	}

	async generateArticles(){

		if(lastPage != currentPage){

			lastPage = currentPage
			let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + API_KEY +  '&pageSize=' + (PER_PAGE * currentPage);

	   		if(currentText != '') {
	      		url += '&q=' + currentText
	   		}

	   		if(currentPublisher != 'none') {
	      		url += '&sources=' + currentPublisher
	   		}

	      	let request = await fetch(url)
	      	let requestJSON = await request.json()
	   		let news = [];

	        let articles = requestJSON.articles

	        if( (articles.length == 0) && (currentPage == 1)){ 

            	news.push( e('p', 
	      						{ 
	      							key: Math.floor(Math.random() * 10000)
	      						},  
	      						'There are no articles matching your request'
	    					)
            	)

         	} else {

         		for (let i = 0, len = articles.length; i < len; i++) {
	  				news.push( this.createCart(articles[i]) );
				}

         	}

			this.setState({
     			data: news
   			})

   			var moreNews = document.getElementById('button-more')

   			if( (articles.length < (PER_PAGE * currentPage) ) || (currentPage == PAGES_COUNT) ){
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
    	this.generateArticles();
    	return true
  	}

  	componentWillMount() {
		this.generateArticles();
  	}


  	render() {
  		return this.state.data;
  	}
}

function renderNews() {
	ReactDOM.render(
		React.createElement(NewsGenerator, null, null),
		document.getElementById('News')
	);
}

function search() {
	currentPage = 1
	lastPage = 0

	var searchInput = document.getElementById('search-input')
	var searchSource = document.getElementById('search-source')

	currentPublisher = searchSource.value
	currentText = searchInput.value
							   		
	renderNews()
}

async function loadSources() {
   	let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY   
	let request = await fetch(url)
	let requestJSON = await request.json()
	let sources = requestJSON.sources
   	let listOfSources = []

   	listOfSources.push( 
        e('option', 
			{
				key: Math.floor(Math.random() * 10000),
				value: 'none'
			},  
			'Все издания'
		)
    );

   	for (let i = 0, len = sources.length; i < len; i++) {
	  	listOfSources.push( 
         		e('option', 
					{
						key: Math.floor(Math.random() * 10000),
						value: sources[i].id
					},  
					sources[i].name
				)
         	);
	}

	ReactDOM.render(
		  	React.createElement('select', {
		                      onChange: () => { 
		                      		search()
		                      	},
		                      key: Math.floor(Math.random() * 10000),
		                      id: 'search-source',
		                      name: 'search-source'
		                    }, 
		                    listOfSources ),
		  	document.getElementById('publishers')
	);

   return listOfSources
}

loadSources()
renderNews()

ReactDOM.render(
  	React.createElement('button', {
        	onClick: () => { 
                currentPage++
                renderNews()
            },
            key: Math.floor(Math.random() * 10000),
            id: 'button-more'
        }, 
        'Load more news'),
  	document.getElementById('button-more')
);

ReactDOM.render(
  	React.createElement('button', {
        	onClick: () => { search() },
        	key: Math.floor(Math.random() * 10000),
        	id: 'search-Button'
        }, 
        'Search'),
  	document.getElementById('button-search')
);

ReactDOM.render(
  	React.createElement('input', {
            onKeyPress: (e) => { 
                if (e.which == 13) {
                    search()
                }
            },
            placeholder: "Поиск...",
            key: Math.floor(Math.random() * 10000),
            id: 'search-input'
        }, 
        null),
  	document.getElementById('search-input')
);