import React from 'react';

function Source(props){
    const {source} = props;
    return (
        <option  value={source.id} id={source.id} key={source.id}>{source.name}</option>
    )
}
export default Source
