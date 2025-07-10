import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    articles = [];

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            isLoading: false,
            page: 1,
            pageSize: 20,
        }
    }
//     render() {
//         return (
//             <div className='container my-4'>
//                 <h1>NewsMonkey - TopHeadlines</h1>
//                 <div className="row">
//                     {/* {this.state.articles.map((element)=>{
//                      <div className="col-md-4" key={element.url}>
//                         <NewsItem  title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url}/>
//                     </div>
//                    )
//                 } */}

//                     {this.state.articles.map((element) => {
//                         return <div className="col-md-4" key={element.url}>
//                             <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
//                         </div>
//    )
//                     }}
//                 </div>

//             </div>
//         )
//     }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=4dc806e784a94c53b38c090b4671d9ae&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page,
            totalResults: parsedData.totalResults
        })
    }

    handlePreClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=4dc806e784a94c53b38c090b4671d9ae&page=${this.state.page - 1 }&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            totalResults: parsedData.totalResults
        })
    }


handleNextClick = async ()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.state.pageSize)){
        return;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=4dc806e784a94c53b38c090b4671d9ae&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        totalResult: parsedData.totalResult
    })
}

render() {
        return (
            <>
            <div className='container my-4'>
                <h1>NewsMonkey - TopHeadlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem 
                                title={element.title} 
                                description={element.description} 
                                imgUrl={element.urlToImage ? element.urlToImage : "https://content.api.news/v3/images/bin/9305755fe7fa2d4d8d72af0136cfea60"} 
                                newsUrl={element.url}
                            />
                        </div>
                    ))}
                </div> 
            </div>
            <div className="container my-1 d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark " onClick={this.handlePreClick}>&#8249; Previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.state.pageSize)}  className="btn btn-dark " onClick={this.handleNextClick}>Next &#8250;</button>

            </div>
            </>
        );
    }
}
