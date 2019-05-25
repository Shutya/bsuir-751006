import React from 'react';
import Model from '../Model';
import RequestInput from '../Header/RequestInput';
import SourceFilter from '../Header/SourceFilter';
import News from './News';
import FailMessage from './FailMessage';
import MoreButton from './MoreButton';
import Footer from '../Footer/Footer';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            loaded: [],
            toggled: new Set(),
            hasMore: false,
            query: ""
        };
        this.MAX_DISPLAYED = 48;

        this.toggle = this.toggle.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleRequestExecution = this.handleRequestExecution.bind(this);
        this.moreButtonClick = this.moreButtonClick.bind(this);
    }

    componentDidMount() {
        this.model = new Model();
        this.model.loadSources().then(value => {
            this.setState({
                sources: value.sources
            });
        });
        this.model.loadRequest().then(() => {
            this.setState({
                loaded: this.model.nextBatch(),
                hasMore: this.model.hasMore()
            });
        });
    }

    render() {
        return (
            <main className="main">
                <RequestInput 
                    loadRequest={this.loadRequest}
                    handleQueryChange={this.handleQueryChange}
                    handleRequestExecution={this.handleRequestExecution}
                />
                <SourceFilter 
                    sources={this.state.sources} 
                    toggle={this.toggle}
                    toggled={this.state.toggled}
                    handleInputClick={this.handleRequestExecution}
                />
                <News
                    loaded={this.state.loaded} 
                />
                <FailMessage
                    visible={!this.state.loaded.length} 
                    message="There are no articles"
                />
                <MoreButton 
                    visible={this.state.hasMore && this.state.loaded.length < this.MAX_DISPLAYED}
                    moreButtonClick={this.moreButtonClick}
                />

                <Footer
                />
            </main>
        );
    }

    toggle(id) {
        let tggld = this.state.toggled;
        if (tggld.has(id)) {
            tggld.delete(id);
        } else {
            tggld.add(id);
        }
        this.setState({
            toggled: tggld
        });
    }

    handleQueryChange(query) {
        this.setState({
            query: query.target.value
        });
    }

    handleRequestExecution() {
        this.model.loadRequest({q: this.state.query}, this.state.toggled).then(() => {
            this.setState({
                loaded: this.model.nextBatch(),
                hasMore: this.model.hasMore()
            });
        });
    }

    moreButtonClick() {
        this.setState({
            loaded: this.state.loaded.concat(this.model.nextBatch()),
            hasMore: this.model.hasMore()
        });
    }
}