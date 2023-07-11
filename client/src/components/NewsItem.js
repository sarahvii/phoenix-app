import React from 'react'

const NewsItem = ( {item} ) => {
  return (
    <div>
      <p>{item.headline}</p>
    </div>
  )
}

export default NewsItem
