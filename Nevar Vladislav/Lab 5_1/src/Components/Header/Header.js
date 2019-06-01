import React, {Component} from 'react';
import '../../App.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            query: ''
        }
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e) {
        e.preventDefault();
        if (e.keyCode === 13) 
            this.props.handleEnterPress();
    }

    render() {
        return (
            <div className='myheader'>
            <div className="header_items">
               <div className="header_text">
                  SimpleNews
               </div>
      
               <div className="search">
                  <select name="search-source" className="search_source" id="search_source" onChange={(e)=>{this.props.handleToggle(e.target[e.target.selectedIndex].id)}}>
                  <option
                            key='All'
                            id=''
                            selected
                        >
                        Любой издатель
                    </option>
                  {
                        this.props.sources.map((source) => 
                            <option 
                                key={source.id}
                                id={source.id}
                            >
                            {source.name}
                            </option>
                        )
                    }
                  </select>
                  <input type="text" name="search-input" className="search_input" id="search_input"
                                            onChange={this.props.handleQueryChange}
                                            onKeyUp={this.handleKeyUp}/>
                  <input type="button" name="search-button" value="Search" className="search_button" id="search_button"
                                            onClick={this.props.handleEnterPress}/>
               </div>
            </div>
         </div>
        )
    }
}

export default Header;