import React from 'react';

export default class News extends React.Component {

    render() {
        const data = this.props.news;
        const NO_PHOTO_URL = 'http://classifieds.parkrecord.com/public/images/no-photo.png'
        const img = data.urlToImage ? data.urlToImage : NO_PHOTO_URL;

        return (
         	<div className="news__item" onClick={()=>{
               window.open(data.url, '_blank');
            }}>
         		<div className="news__item__card">
         			<img src={img} alt={data.title}/>
         			<div className="news__item__caption">
          				<div className="news-middle">
         				<h4>{data.title}</h4>
         				</div>
         			</div>
         		</div>
         		<div className="news__description">
         		<h2>{data.title}</h2>
         		<p>{data.description}</p>

         		<div className="news__source">{data.source.name}</div></div>
         	</div>

          )
    }
}
