import React from 'react'

const ExcahngeCard = ({ text, value, src, from }) => {
  return (
    <div className='flex items-start gap-5'>
      <img src={src} alt='' />
      <div>
        <h2 className='text-light-grey'>{text}</h2>
        <p className='font-light py-3'>{` Dollar to ${from ? from : text} `}</p>
        <h3 className='font-bold pb-4 pt-2'>{`${value} USD`}</h3>
      </div>
    </div>
  )
}

export default ExcahngeCard
