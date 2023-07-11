import React from 'react'

const NewsItem = ( {item} ) => {
  return (
    <div>
      <p>{item.headline}</p>
      <a href={item.url} target="_blank" rel="noreferrer">
        <img src={item.image} alt={item.headline} width="250rem" height="auto"/>
      </a>
    </div>
  )
}

export default NewsItem
