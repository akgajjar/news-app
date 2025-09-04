
import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <>
        <div className='my-3'>
          <div className="card" >
            <div className='d-flex justify-content-end position-absolute end-0'>
              <span className="badge rounded-pill bg-danger" >
                {source}
              </span>
            </div>
            <img src={imgUrl} className="card-img-top" alt="Not available" />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" crossOrigin="anonymous" className="btn btn-primary btn-sm">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}
