import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
           <footer>
               <div className="logo black-logo">
                  <a href="">B<span>rakh</span>N<span>ews</span></a>
               </div>
               <div className="social">
                  <ul>
                    <li><a href=""><i className="fa fa-vk"></i></a></li>
                    <li><a href=""><i className="fa fa-instagram"></i></a></li>
                    <li><a href=""><i className="fa fa-twitter"></i></a></li>
                  </ul>
               </div>

           </footer>
        );
    }
}
