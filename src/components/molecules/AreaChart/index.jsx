import { Area } from '@ant-design/plots'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AreaChart = () => {
  const [data, setData] = useState([])
  const apiKey = import.meta.env.VITE_API_KEY
  useEffect(() => {
    const getLatestCrudeOilPrice = async () => {
      const URL = `https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=${apiKey}`
      const response = await axios.get(URL)
      const data = response.data.data
      const reverseData = [...data].reverse()
      setData(reverseData)
    }
    getLatestCrudeOilPrice()
  }, [])

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    animation: false,
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: {
        isArea: true,
      },
    },
  }
  return <Area {...config} style={{ height: '140px' }} />
}

export default AreaChart
