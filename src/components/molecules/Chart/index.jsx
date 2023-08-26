import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RainnyImg from '../../../assets/img/rainny.png'
import PartCloudy from '../../../assets/img/partially-cloud.png'
import Storm from '../../../assets/img/storm.png'
import Sunny from '../../../assets/img/sunny.png'

const Weather = () => {
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const getLatestCrudeOilPrice = async () => {
      const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lagos?unitGroup=metric&key=JRNNMB3H7QTBYW3HS3RDLESCN&contentType=json`
      const response = await axios.get(URL)

      setWeatherData(response.data)
    }
    getLatestCrudeOilPrice()
  }, [])
  const currentDateTimeStr = weatherData?.currentConditions.datetime
  const currentDateTime = new Date(`2023-08-26T${currentDateTimeStr}`)
  const currentEpoch = Math.floor(currentDateTime.getTime() / 1000)
  const dataWithEpoch = weatherData?.days?.[0].hours?.map((obj) => ({
    ...obj,
    datetimeEpoch: parseInt(obj.datetimeEpoch),
  }))
  const filteredData = dataWithEpoch?.filter(
    (obj) => obj.datetimeEpoch > currentEpoch
  )
  filteredData?.sort((a, b) => a.datetimeEpoch - b.datetimeEpoch)

  const nextThreeObjects = filteredData?.slice(0, 3)

  const formatTime = (inputTime) => {
    const parsedTime = new Date(`1970-01-01T${inputTime}Z`)
    const formattedTime = parsedTime
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      .replace(/\d+:\d+/, '$&')
    return formattedTime
  }
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1)
  }

  return (
    <div className='w-full md:w-[40.3%] bg-secondary-color rounded-lg px-10 py-5 my-0 '>
      <h1 className='text-[#023E8A] text-xl mb-8'>
        Weather (
        <span className='text-base'>
          {capitalizeFirstLetter(weatherData?.address)}
        </span>
        )
      </h1>
      <div className='flex gap-5'>
        <div>
          <p className='mb-4'>Now</p>
          {weatherData?.currentConditions.icon === 'rain' && (
            <img className='mb-4' src={RainnyImg} alt='' />
          )}
          {weatherData?.currentConditions.icon === 'partly-cloudy-day' && (
            <img className='mb-4' src={PartCloudy} alt='' />
          )}
          {weatherData?.currentConditions.icon === 'storm' && (
            <img className='mb-4' src={Storm} alt='' />
          )}
          {weatherData?.currentConditions.icon === 'sunny' && (
            <img className='mb-4' src={Sunny} alt='' />
          )}
          <p className='mb-4'>{weatherData?.currentConditions.temp}&#176;C</p>
        </div>
        <div className='flex gap-5 justify-center'>
          {nextThreeObjects?.map(({ temp, datetime, icon }, idx) => {
            return (
              <div key={idx}>
                <p className='mb-4'>{formatTime(datetime)}</p>
                {icon === 'rain' && (
                  <img className='mb-4' src={RainnyImg} alt='' />
                )}
                {icon === 'partly-cloudy-day' && (
                  <img className='mb-4' src={PartCloudy} alt='' />
                )}
                {icon === 'rain' && <img className='mb-4' src={Storm} alt='' />}
                {icon === 'rain' && <img className='mb-4' src={Sunny} alt='' />}
                <p className='mb-4'>{temp}&#176;C</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex justify-between text-[#023E8A]'>
        <p>
          Precipitation <span> 14%</span>
        </p>
        <p>
          Humidity <span> {weatherData?.currentConditions.humidity}</span>
        </p>
        <p>
          Wind <span> 16km/h</span>
        </p>
      </div>
    </div>
  )
}

export default Weather
