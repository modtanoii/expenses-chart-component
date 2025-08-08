import React from 'react'
import { useState, useEffect } from 'react';

const Expenses = () => {
  const [chartData, setChartData] = useState(null);
  useEffect (() => {
    fetch("data.json")
    .then(res => res.json()
    .then(data -> {
      setChartData({
        labels: data.map(item => item.month)
      })
    }))
  })
  return (
    <div>
        <main className='bg-red-100 h-screen font-dmsans'>
            <div className='container mx-auto mt-10 rounded-3xl w-[540px] h-30 bg-orange-500'>
              <div className='p-8 w-fit'>
                <h2 className='text-lg'>My balance</h2>
                <h2 className='text-3xl font-bold'>$921.48</h2>
              </div>
            </div>
            <div className='container mx-auto mt-6 p-10 rounded-3xl w-[540px] h-30 bg-white'>
              <h1 className='text-[28px] font-bold tracking-widest'>Spending - Last 7 days</h1>
              <canvas id="myChart" width="400" height="200"></canvas>
            </div>
        </main>
    </div>
  )
}

export default Expenses