"use strict";
import "regenerator-runtime/runtime";

export async function getNews(source, request, articlesLoaded) {
    console.log('source');
    console.log(source);
    console.log('request');
    console.log(request);
    console.log('articlesLoaded');
    console.log(articlesLoaded);
    var pageNumber = articlesLoaded  / 5;
    pageNumber += 1;
    console.log('page Number');
    console.log(pageNumber);
    if (request != null)
    {
        if (source != null)
        {
            console.log('source with request');
            var url = `https://newsapi.org/v2/everything?q=${request}&sources=${source}&language=en&page=${pageNumber}&pageSize=5&apiKey=4039118a1f7247be89caa1d84d8261fa`;
        }
        else
        {
            var url = `https://newsapi.org/v2/everything?q=${request}&language=en&page=${pageNumber}&pageSize=5&apiKey=4039118a1f7247be89caa1d84d8261fa`;
        }
    }
    else
    {
        if (source != null)
        {
            var url = `https://newsapi.org/v2/everything?sources=${source}&language=en&page=${pageNumber}&pageSize=5&apiKey=4039118a1f7247be89caa1d84d8261fa`;
        }
        else
        {
            var url = 'https://newsapi.org/v2/top-headlines?' +
                'country=us&page=' + pageNumber + '&pageSize=5&' +
                'apiKey=4039118a1f7247be89caa1d84d8261fa';
        }
    }
    var req = new Request(url);
    var result = await fetch(req);
    var response = await result.json();
    console.log(response);
    return response;
}

// curr_news_shown = 0;
// 	if (source != null)
// 	{
// 		var url = `https://newsapi.org/v2/everything?sources=${source}&language=en&pageSize=40&apiKey=4039118a1f7247be89caa1d84d8261fa`;
// 	}
// 	else
// 	{
// 		if (request != null)
// 		{
// 			var url = `https://newsapi.org/v2/everything?q=${request}&language=en&pageSize=40&apiKey=4039118a1f7247be89caa1d84d8261fa`;
// 		}
// 		else
// 		{
// 			var url = 'https://newsapi.org/v2/top-headlines?' +
// 	          'country=us&' + 'pageSize=40&' +
// 	          'apiKey=4039118a1f7247be89caa1d84d8261fa';
//       	}

// 	}
// 	var req = new Request(url);
// 	fetch(req)
// 	    .then(function(response) {
// 	        console.log(response.statusText);
// 	        return response.json();
// 	    }).then(function(jsonData)
// 	    {
// 	    	document.getElementById("main").innerHTML = '';
// 	    	jsonData1 = jsonData;
// 	    	if (jsonData1.articles.length == 0)
// 	    	{
// 	    		console.log("ZERO");
// 				document.getElementById("main").innerHTML = "<p>No results matching your request. Please try something else <p>";
// 				return;
// 	    	}
// 	    	for (var i = jsonData1.articles.length - 1; i > 0; i--)
// 	    	{
// 	    		for (var k = 0; k < i; k++)
// 	    		{
// 	    			if (jsonData1.articles[i].url == jsonData1.articles[k].url)
// 	    			{
// 	    				jsonData1.articles.splice(i, 1);
// 	    				console.log("Deleted");
// 	    			}
// 	    		}
// 	    	}
// 			main();
// 	    	return jsonData;
// 	    });