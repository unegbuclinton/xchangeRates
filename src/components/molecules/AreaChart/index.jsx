import { Area } from '@ant-design/plots'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EmbeddedTaggbox = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='taggbox'
        style={{ width: '100%', height: '100%' }}
        data-widget-id='138715'
        data-tags='false'
      ></div>
      <script
        src='https://widget.taggbox.com/embed-lite.min.js'
        type='text/javascript'
      ></script>
    </div>
  )
}

const AreaChart = () => {
  return <EmbeddedTaggbox />
}

export default AreaChart
