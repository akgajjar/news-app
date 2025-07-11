import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    setProgress;

    static defaultProps = {
        pageSize: 8,
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoading: true,
            page: 1,
            totalResults: 0,
            pageSize: this.props && this.props.pageSize ? this.props.pageSize : 20,
            country: this.props.country,
            category: this.props.category,
            
        }
        this.setProgress = this.props.setProgress;
        document.title = `NewsMonkey - ${this.capitalizeString(this.props.category)}`
    }

    capitalizeString = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    updateNews = async () => {
        this.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        
        try {
            let data = await fetch(url);
            this.setProgress(50);
            let parsedData = await data.json();
            this.setProgress(70);
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                isLoading: false
            });
            this.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ isLoading: false });
            this.setProgress(0);
        }
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = () => {
     
           this.setState(
            prevState => ({ page: prevState.page + 1 }),
            () => this.updateNews() // Callback after state update
        );
    }

    render() {
        return (
            <>
                
                    <h1 className='text-center'>NewsMonkey - Top {this.capitalizeString(this.props.category)} Headlines</h1>
                    {this.state.isLoading && <Spinner />}
                        <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Spinner />}
                        scrollableTarget="scrollableDiv">
                        <div className="container">
                            <div className="row">
                                
                                {this.state.articles.map((element,index) => (
                                    
                                    <div className="col-md-4" key={element.source.id + "-" + index}>
                                        <NewsItem
                                            title={element.title? element.title: ""}
                                            description={element.description? element.description: ""}
                                            imgUrl={element.urlToImage ? element.urlToImage : "https://fastly.picsum.photos/id/1005/536/354.jpg?hmac=UBlpg8wb7USpkO6HqTl79vxd9_nXRS76UIdAcY2kqq4"}
                                            newsUrl={element.url}
                                            author={element.author ? element.author : "unknown"}
                                            date={element.publishedAt}
                                            source={element.source ? element.source.name : ""}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        </InfiniteScroll>
                    
            </>
        );
    }
}
