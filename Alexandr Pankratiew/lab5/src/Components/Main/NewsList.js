import React from 'react';
import News from './News';

export default class NewsList extends React.Component {
    render() {
        return (
           <main className="main">
             <section className="news black">
                <div className="out-news">
                   <h1 className="center">Last news</h1>
                   <div className="news" id="news">
                      {
                          this.props.loaded.map((news, index) =>
                              <News
                                  key={index}
                                  news={news}
                              />
                          )
                      }
                  </div>
               </div>
            </section>
         </main>
        );
    }
}
