import React, { useEffect, useState } from 'react'
import ExcahngeCard from '../ExchangeInItials'
import { heroData } from '../../../json'
import axios from 'axios'

const HeroSection = () => {
  const [rate, setRate] = useState()
  useEffect(() => {
    const getLatestPrice = async () => {
      const URL = `https://api.exchangerate.host/latest?base=USD`
      const response = await axios.get(URL)
      setRate(response.data.rates)
    }
    getLatestPrice()
  }, [])

  return (
    <div className='w-[95%] bg-secondary-color rounded-lg px-14 py-5 my-0 mx-auto'>
      <h1 className='text-lg text-primary-color mb-10'>My Currency Exchange</h1>
      <div className='flex flex-wrap gap-[35px] md:gap-0 justify-between'>
        {heroData?.map(({ text, image, abbr }, idx) => (
          <ExcahngeCard
            key={idx}
            text={text}
            src={image}
            value={rate?.[abbr]}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection
