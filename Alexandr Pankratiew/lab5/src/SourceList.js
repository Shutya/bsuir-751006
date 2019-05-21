import React from 'react';
import Source from './Source.js';

function SourceList({sourceList}){
    let list = sourceList.map(source => <Source source = {source}/>)
//    list = list.push(<Source source = {{id: "none", name: "KEK"}}/>)/
//    console.log(list)
    return(
        list
    )
}

export default SourceList
