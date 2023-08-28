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
        'https://gnews.io/api/v4/search?q=example&lang=en&country=ng&max=10&apikey=46e59774ce891e21cf9b762e0e09eba6'

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
