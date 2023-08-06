import React, { useEffect, useState } from 'react'
import ExcahngeCard from '../ExchangeInItials'
import { heroData } from '../../../json'
import axios from 'axios'
import euros from '../../../assets/img/euros.png'
import pounds from '../../../assets/img/pounds.png'
const HeroSection = () => {
  const [rate, setRate] = useState()
  const [poundsRate, setPounds] = useState()
  const [eurosRate, setEuros] = useState()
  useEffect(() => {
    const getLatestPrice = async () => {
      const URL = `https://api.exchangerate.host/latest?base=USD`
      const response = await axios.get(URL)
      setRate(response.data.rates)
    }
    getLatestPrice()
  }, [])

  useEffect(() => {
    const getLatestPrice = async () => {
      const URL = `https://api.exchangerate.host/latest?base=GBP`
      const response = await axios.get(URL)
      setPounds(response.data.rates)
    }
    getLatestPrice()
  }, [])
  useEffect(() => {
    const getLatestPrice = async () => {
      const URL = `https://api.exchangerate.host/latest?base=EUR`
      const response = await axios.get(URL)
      setEuros(response.data.rates)
    }
    getLatestPrice()
  }, [])
  return (
    <div className='w-[95%] bg-secondary-color rounded-lg px-14 py-5 my-0 mx-auto'>
      <h1 className='text-lg text-primary-color mb-10'>My Currency Exchange</h1>
      <div className='flex flex-wrap gap-[35px] md:gap-0 justify-between'>
        {heroData?.map(({ text, image, textValue, abbr, base, pref }, idx) => (
          <ExcahngeCard
            key={idx}
            textValue={textValue}
            text={text}
            naira={pref}
            base={base}
            src={image}
            value={rate?.[abbr]}
          />
        ))}
        <div className='flex items-start gap-5'>
          <img src={euros} alt='' />
          <div>
            <h2 className='text-light-grey'>Euros</h2>
            <p className='font-light py-3'>Euros to Naira</p>
            <h3 className='font-bold pb-4 pt-2'>{`${eurosRate?.NGN} NGN`}</h3>
          </div>
        </div>
        <div className='flex items-start gap-5'>
          <img src={pounds} alt='' />
          <div>
            <h2 className='text-light-grey'>Pounds</h2>
            <p className='font-light py-3'>Pounds to Naira</p>
            <h3 className='font-bold pb-4 pt-2'>{`${poundsRate?.NGN} NGN`}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

// {
//   text: 'Euros',
//   image: euros,
//   abbr: 'EUR',
// },
// {
//   text: 'Pounds',
//   image: pounds,
//   abbr: 'GBP',
// },
