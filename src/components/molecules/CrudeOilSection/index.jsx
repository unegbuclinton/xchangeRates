import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CrudeOilSection = () => {
  const [brentValue, setBrentValue] = useState()
  const [wti, setWTI] = useState()
  const [gas, setGas] = useState()
  const apiKey = import.meta.env.VITE_API_KEY
  useEffect(() => {
    const getLatestCrudeOilPrice = async () => {
      const URL = `https://www.alphavantage.co/query?function=BRENT&interval=daily&apikey=${apiKey}`
      const response = await axios.get(URL)
      setBrentValue(response.data?.data?.[0]?.value)
    }
    getLatestCrudeOilPrice()
  }, [])
  useEffect(() => {
    const getLatestCrudeOilPrice = async () => {
      const URL = `https://www.alphavantage.co/query?function=NATURAL_GAS&interval=monthly&apikey=${apiKey}`
      const response = await axios.get(URL)

      setGas(response.data?.data?.[0]?.value)
    }
    getLatestCrudeOilPrice()
  }, [])
  useEffect(() => {
    const getLatestCrudeOilPrice = async () => {
      const URL = `https://www.alphavantage.co/query?function=WTI&interval=daily&apikey=${apiKey}`
      const response = await axios.get(URL)

      setWTI(response.data?.data?.[0]?.value)
    }
    getLatestCrudeOilPrice()
  }, [])
  const crudeData = [
    { text: 'Brent Oil', value: brentValue },
    { text: 'WTI Oil', value: wti },
    { text: 'Natural Gas', value: gas, from: 'million BTU' },
  ]

  const ExcahngeCard = ({ text, value, src, from }) => {
    return (
      <div className='flex items-start gap-5'>
        <div className='flex items-center gap-5'>
          <p className='font-light py-3'>{` Dollar to ${
            from ? from : text
          } `}</p>
          <h3 className='font-bold'>{`${value} USD`}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className='my-[23px] '>
      <div className='w-[95%] bg-secondary-color rounded-lg px-14 py-5 my-0 mx-auto'>
        <h1 className='text-lg text-primary-color mb-4'> Prices of Fuels</h1>
        <div className='flex flex-col '>
          {crudeData?.map(({ text, value, from }, idx) => (
            <ExcahngeCard key={idx} text={text} value={value} from={from} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CrudeOilSection
