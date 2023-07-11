import React from 'react'
import NewsItem from './NewsItem'

const NewsList = ( {generalNews} ) => {
  return (
    <div>
      {generalNews.map((item, index, image) => (
        <NewsItem key={index} item={item} image={image} />
      ))}
    </div>
  )
}

export default NewsList
