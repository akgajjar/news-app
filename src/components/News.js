import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
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
            isLoading: false,
            page: 1,
            pageSize: this.props && this.props.pageSize ? this.props.pageSize : 20,
        }
    }

    updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4dc806e784a94c53b38c090b4671d9ae&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        this.setState({ isLoading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page,
            totalResults: parsedData.totalResults,
            isLoading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }


    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {
            return;
        }

        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    render() {
        return (
            <>
                <div className='container my-4'>
                    <h1 className='text-center'>NewsMonkey - TopHeadlines</h1>
                    {this.state.isLoading && <Spinner />}
                    <div className="row">
                        {this.state.articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title}
                                    description={element.description}
                                    imgUrl={element.urlToImage ? element.urlToImage : "https://content.api.news/v3/images/bin/9305755fe7fa2d4d8d72af0136cfea60"}
                                    newsUrl={element.url}
                                    author={element.author ? element.author : "unknown"}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container my-1 d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.handlePreClick}>&#8249; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} className="btn btn-dark " onClick={this.handleNextClick}>Next &#8250;</button>

                </div>
            </>
        );
    }
}
