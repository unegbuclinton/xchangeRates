import React, { useEffect, useState } from 'react'
import AreaChart from '../AreaChart'
import { Select } from 'antd'
import axios from 'axios'
import { exchangeRates } from '../../../json'

const SubHeroSection = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [depCurrency, setDepCurrency] = useState('EUR')
  const [exchangeRate, setExchangeRate] = useState(0)
  const [baseValue, setBaseValue] = useState(1)
  const [depValue, setDepValue] = useState(1)

  const URL = `https://api.exchangerate.host/convert?from=${baseCurrency}&to=${depCurrency}`
  const convertCurrency = async () => {
    const res = await axios.get(URL)
    const data = res.data.info.rate
    setExchangeRate(data)
    const exchangeValue = data * baseValue
    setDepValue(exchangeValue.toFixed(2))
  }

  const handleBaseCurrencyChange = (value) => {
    setBaseCurrency(value)
  }
  const handleDepCurrencyChange = (value) => {
    setDepCurrency(value)
  }
  useEffect(() => {
    convertCurrency()
  }, [baseCurrency, depCurrency])

  const handleDepValueChange = (e) => {
    const value = e.target.value
    setDepValue(value)
    const updateBaseValue = value / exchangeRate
    setBaseValue(updateBaseValue.toFixed(2))
  }

  const handleBaseValueChange = (e) => {
    const value = e.target.value
    setBaseValue(value)
    const updateBaseValue = value * exchangeRate
    setDepValue(updateBaseValue.toFixed(2))
  }

  return (
    <div className='flex flex-wrap md:flex-nowrap gap-5 w-[95%]  my-0 mx-auto  mt-[23px]'>
      <div className='w-full md:w-1/2 bg-secondary-color p-5 rounded-lg'>
        <AreaChart />
        <a
          className='text-blue-800 text-sm hover:underline cursor-pointer'
          href='https://app.powerbi.com/view?r=eyJrIjoiNDE3NWEyNzQtNzUwZS00ZmViLWI0YjItYzE2MGIxNzVmY2E0IiwidCI6Ijg3ZTFjNTNlLTI4MDMtNDdkYy1hZjFmLTI5NjM4OGFmYThkYiJ9'
          target='_blank'
          rel='noopener noreferrer'
        >
          Detailed Presentation
        </a>
      </div>
      <div className='w-full md:w-1/2 bg-secondary-color p-5 rounded-lg'>
        <h1 className='font-semibold text-primary-color mb-5'>
          Exchange Converter
        </h1>
        <div className='flex flex-wrap justify-center lg:justify-start gap-3'>
          <div className='flex flex-col gap-3'>
            <Select
              showSearch
              defaultValue={baseCurrency}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={handleBaseCurrencyChange}
              options={exchangeRates}
            />
            <input
              type='number'
              value={baseValue}
              onChange={handleBaseValueChange}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Select
              showSearch
              defaultValue={depCurrency}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={handleDepCurrencyChange}
              options={exchangeRates}
            />
            <input
              id='depValue'
              type='number'
              //   value={baseValue * exchangeRate}
              value={depValue}
              onChange={handleDepValueChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubHeroSection
