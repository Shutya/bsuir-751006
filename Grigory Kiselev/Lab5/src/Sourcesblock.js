import React from 'react';
import {Component} from 'react';
import Source from './source';

export default class SourcesBlock extends Component {
    constructor(params) {
        super();
        this.setSource = params.setSource;
        this.state = {currSource : '', currSourceName : ''};
        this.sources = params.sources;
    }

    render() {
        // console.log('in sources block');
        // console.log(this.props.sources.params);
        console.log('SOURCES');
        console.log(this.sources);
        //const innerSources = this.props.sources.params;
        const innerSources = this.sources.params;
        const sourceList = innerSources.map((x) => <Source changeSource={this.changeSource} currSourceName = {this.state.currSourceName} source = {x}/>);
        // console.log('sourceList');
        //console.log(sourceList);
        console.log('CURRSOURCENAME');
        console.log(this.state.currSourceName);

        return (
            <div className='sourceselector'
                ref = {(block) => {this.props.sources = block; }} id = "sources">
                {sourceList}
            </div>
        )
    }

    changeSource = async (source) => {
        await this.setState({currSource : source.id, currSourceName : source.name}); // LAST UNCOMMENTED
        this.state.currSource = source.id;
        this.state.currSourceName = source.name;
        console.log(this.state.currSource);
        this.setSource();
    }
}