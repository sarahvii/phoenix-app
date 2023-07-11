import React from 'react'
import NewsItem from './NewsItem'

const NewsList = ( {generalNews} ) => {
  return (
    <div>
      {generalNews.map((item, index) => (
        <NewsItem key={index} item={item} />
      ))}
    </div>
  )
}

export default NewsList
