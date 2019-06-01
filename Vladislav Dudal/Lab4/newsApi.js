  var currentNewsCount = 5;
  var isLoadMore = false;
  var urlToLoadNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd10d70c1e254af8830a80537690640f";
  document.addEventListener('DOMContentLoaded', function(){ 
    doRequest("topNews", "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd10d70c1e254af8830a80537690640f", currentNewsCount);

    document.getElementById("searchbtn").addEventListener('click', function(e){
      e.preventDefault();
      let query = document.getElementById("searchquery").value;
      let url = "https://newsapi.org/v2/top-headlines?q="+query+"&country=us&apiKey=bd10d70c1e254af8830a80537690640f";
      doRequest(query, url, 0);
    });

    document.getElementById("australiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("au", "https://newsapi.org/v2/top-headlines?country=au&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("austriabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("at", "https://newsapi.org/v2/top-headlines?country=at&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("belgiumbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("be", "https://newsapi.org/v2/top-headlines?country=be&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("bulgarybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("bg", "https://newsapi.org/v2/top-headlines?country=bg&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("francebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("fr", "https://newsapi.org/v2/top-headlines?country=fr&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("germanybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("de", "https://newsapi.org/v2/top-headlines?country=de&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("hungarybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("hu", "https://newsapi.org/v2/top-headlines?country=hu&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("indiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("in", "https://newsapi.org/v2/top-headlines?country=in&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("germanybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("de", "https://newsapi.org/v2/top-headlines?country=de&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("irelandbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ie", "https://newsapi.org/v2/top-headlines?country=ie&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("italybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("it", "https://newsapi.org/v2/top-headlines?country=it&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("latviabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("lv", "https://newsapi.org/v2/top-headlines?country=lv&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("mexicobtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("mx", "https://newsapi.org/v2/top-headlines?country=mx&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("netherbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nl", "https://newsapi.org/v2/top-headlines?country=nl&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("newzelbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nz", "https://newsapi.org/v2/top-headlines?country=nz&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("norwaybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("no", "https://newsapi.org/v2/top-headlines?country=no&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("phillbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ph", "https://newsapi.org/v2/top-headlines?country=ph&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("polandbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("pl", "https://newsapi.org/v2/top-headlines?country=pl&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("russiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ru", "https://newsapi.org/v2/top-headlines?country=ru&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("serbiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("rs", "https://newsapi.org/v2/top-headlines?country=rs&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("slovakiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("sk", "https://newsapi.org/v2/top-headlines?country=sk&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("swedenbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("se", "https://newsapi.org/v2/top-headlines?country=se&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("switzerlandbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ch", "https://newsapi.org/v2/top-headlines?country=ch&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("turkeybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("tr", "https://newsapi.org/v2/top-headlines?country=tr&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("uaebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ae", "https://newsapi.org/v2/top-headlines?country=ae&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("ukrainebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ua", "https://newsapi.org/v2/top-headlines?country=ua&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("ukbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("gb", "https://newsapi.org/v2/top-headlines?country=gb&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("usbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("us", "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("venezuelabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ve", "https://newsapi.org/v2/top-headlines?country=ve&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("abcnewsbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("abc", "https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("asspbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("assp", "https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("bbcbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("bbc", "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("bbcsportbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("sportbbc", "https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("insiderbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("insider", "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("cnbcbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("cnbc", "https://newsapi.org/v1/articles?source=cnbc&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("cnnbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("cnn", "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("financial-timesbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("financial", "https://newsapi.org/v1/articles?source=financial-times&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("fortunebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("fortune", "https://newsapi.org/v1/articles?source=fortune&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });
    
    document.getElementById("googlebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("google", "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("hackerbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("hack", "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("Independentbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("independent", "https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("mtvbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("mtv", "https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("natgeobtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("natgeo", "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("Newsweekbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("week", "https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });


    document.getElementById("nflbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nfl", "https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("polygonbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("poly", "https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("Recodebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("recode", "https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("Reutersbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("reuter", "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("TalkSportbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("talksport", "https://newsapi.org/v1/articles?source=talksport&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("TechRadarbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("techradar", "https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("economistbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("econom", "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("hindubtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("hindu", "https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("biblebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("biblebtn", "https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("nytimesbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nytimes", "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("timebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("times", "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("washpostbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("washpost", "https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("usatodaybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("usatoday", "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=bd10d70c1e254af8830a80537690640f", 0);
    });

    document.getElementById("loadbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("topNews", urlToLoadNews, currentNewsCount);
    });

  });

  function onclickTopNews(e, url)
  {
    e.preventDefault();
    if (isLoadMore === false)
    {
      currentNewsCount = 5; 
      isLoadMore == true;
    }
    urlToLoadNews = url; 
  }

  function searchTopNews(countNews, latestNews, output)
  {
    for(var i = 0; i < countNews; i++)
    {
      if (i === latestNews.length - 1 || i === 39)
      {
        document.getElementById("loadbtn").type = "hidden";
        isLoadMore = false;
        return output;
      }
      output +=
        `<div class="col s4 white" style="width: 600px; margin-left: 45px;">
            <h4><b>${latestNews[i].title}</b></h4>
            <img src="${latestNews[i].urlToImage}" class="responsive-img">
            <p>${latestNews[i].description}</p>
            <p>Published at: ${latestNews[i].publishedAt}</p>
            <a href="${latestNews[i].url}" target="_blank" style="width: 100%;" class="btn">Read more</a>
          </div>`;
    }
    document.getElementById("loadbtn").type = "submit";   
    return output;
  }

  function searchByQuery(latestNews, output)
  {
    for(var i in latestNews)
    {
      if (i >= 50)
      {
        return output;
      }
      output +=
        `<div class="col s4 white" style="width: 600px; margin-left: 45px;">
            <h4><b>${latestNews[i].title}</b></h4>
            <img src="${latestNews[i].urlToImage}" class="responsive-img">
            <p>${latestNews[i].description}</p>
            <p>Published at: ${latestNews[i].publishedAt}</p>
            <a href="${latestNews[i].url}" target="_blank" style="width: 100%;" class="btn">Read more</a>
         </div>`;
    }
    document.getElementById("loadbtn").type = "hidden";
    return output;
  }

  function doRequest(query, url, countNews)
  {
      if (query !== "")
      {
        ajax({
          method: 'GET',
          url: url,
          success: function(news)
          {
            let output = "";
            let latestNews = news.articles;

            if (latestNews.length !== 0)
            {
              if (countNews === 0)
              {
                output = searchByQuery(latestNews, "");
              }
              else
              {
                output = searchTopNews(countNews, latestNews, output);
                currentNewsCount += 5;
              }
              document.getElementById("newsResults").innerHTML = output;
            }
            else
            {
                let noNews = `<div class="col s4" style="font-size:36px; margin-left:25px; width:600px; margin-top:40px; color:white;">
                  <h4>There are no articles matching your request</h4>
                </div>`;
                document.getElementById("loadbtn").type = "hidden";
                document.getElementById("newsResults").innerHTML = noNews;
            }        
          }, 
          error: function()
          {
            let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px; color: white;">Please check your internet connection and try again.
             <img src="img/internet.png" class="responsive-img">
             </div>`;
            document.getElementById("newsResults").innerHTML = internetFailure;
          }
        });
      }
  }


  function ajax(params)
  {
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    request.onreadystatechange = function(){
      if (this.readyState === 4)
      {
        if (this.status >= 200 && this.status < 400)
        {
          if (params.success)
          {
            params.success(JSON.parse(this.response));
          }
        }
        else
        {
          if (params.error)
          {
            params.error();
          }
        }
      }
    };
    request.send();
  }