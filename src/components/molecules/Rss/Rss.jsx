import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Fire from '../../../assets/img/fire.png'

const Rss = () => {
  const [articleData, setArticleData] = useState([])
  useEffect(() => {
    const getNewsHeadline = async () => {
      const url =
        'https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=945c1260c15c4f21938e5a1ebb46c605'

      const response = await axios.get(url)
      setArticleData(response.data.articles)
    }
    getNewsHeadline()
  }, [])

  const renderPairs = () => {
    const pairs = []
    for (let i = 0; i < articleData.length; i += 2) {
      const pair = articleData.slice(i, i + 2)
      pairs.push(
        <li key={i}>
          {pair.map(({ author, source, title, publishedAt, url }, idx) => {
            const formattedTimestamp = new Date(publishedAt).toLocaleString()
            return (
              <div
                key={idx}
                className='mb-4 text-left border-b border-gray-300 pb-3'
              >
                <p className='text-black/80 mb-2 text-xs'>
                  {author}
                  {/* <span>
            <sup>published_at:{formattedTimestamp} </sup>
          </span> */}
                </p>
                <h3 className='hover:underline hover:text-[#023E8A]'>
                  <a href={url} target='_blank'>
                    {title}
                  </a>
                </h3>
              </div>
            )
          })}
        </li>
      )
    }
    return pairs
  }
  return (
    <div className='w-full md:w-[29%] bg-light-pink rounded-lg px-10 py-5 my-0 '>
      <h1 className='text-[#023E8A] text-xl mb-8 flex gap-2 items-center'>
        <span>
          <img src={Fire} alt='' />
        </span>
        Top stories
      </h1>
      <Carousel autoPlay showThumbs={false} showArrows={false} infiniteLoop>
        {renderPairs()}
      </Carousel>
    </div>
  )
}

export default Rss
