import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        try {
            setIsLoading(true); 
            const response = await fetch(url);
            props.setProgress(50);
            const data = await response.json();
            props.setProgress(70);

            if (data.articles && data.articles.length > 0) {
                setArticles(prev => [...prev, ...data.articles]); // Append new articles
                setTotalResults(data.totalResults);
                setHasMore(page < Math.ceil(data.totalResults / props.pageSize));
            } else {
                setHasMore(false); // No more articles
            }

            props.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
            props.setProgress(100);
        }
    };

    // Fetch data when `page` changes
    useEffect(() => {
        updateNews();
    }, [page]);

    const fetchMoreData = () => {
        if (hasMore) setPage(prev => prev + 1); // Increment page safely
    };

    return (
        <>
            <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>
                NewsMonkey - Top {capitalizeString(props.category)} Headlines
            </h1>
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
                scrollableTarget="scrollableDiv"
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => (
                            <div className="col-md-4" key={`${element.source.id}-${index}`}>
                                <NewsItem
                                    title={element.title || ""}
                                    description={element.description || ""}
                                    imgUrl={element.urlToImage || "https://fastly.picsum.photos/id/1005/536/354.jpg?hmac=UBlpg8wb7USpkO6HqTl79vxd9_nXRS76UIdAcY2kqq4"}
                                    newsUrl={element.url}
                                    author={element.author || "unknown"}
                                    date={element.publishedAt}
                                    source={element.source?.name || ""}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

News.defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general',
};

export default News;