import React, { useEffect, useRef, useState  } from "react";
import { Chart } from 'chart.js/auto';
import logo from '/src/assets/images/logo.svg';

const Expenses = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState([]);

  const backgroundColors = chartData.map(item => {
  const value = item.amount;
  if (value > 50) return '#4bc0c0';
  else if (value > 40) return '#ec775f';
  else if (value > 20) return '#ff6332';
  else return '#ff6300';
});

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: chartData.map((item) => item.day),
          datasets: [
            {
              label: "Amount ($)",
              data: chartData.map((item) => item.amount),
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors.map(color => color.replace('0.8', '0.5'))
            },
          ],
        },
        options: {
          responsive: true,
          borderRadius: 5,
          borderSkipped: false,
          plugins: {
            legend: { 
              display: false 
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              border: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false
              },
              ticks: {
                display: false
              },
              border: {
                display: false
              }
            },
          },
        },
      });
    }
  }, [chartData, backgroundColors]);

  return (
    <div>
        <main className='bg-red-100 pt-20 px-4 items-center min-h-screen md:p-8 font-dmsans'>
            <div className='container flex justify-between mx-auto rounded-xl md:rounded-3xl md:w-[540px] h-24 md:h-30 bg-[#ec775f]'>
              <div className='p-5 md:p-6 md:pl-8 text-white'>
                <h2 className='text-[16px] md:text-[17.5px]'>My balance</h2>
                <h2 className='md:mt-1 text-[22px] md:text-[32px] font-semibold'>$921.48</h2>
              </div>
              <div className='flex items-center justify-center p-4 md:p-10'>
                <img className='w-[85%] md:w-[100%]' src={logo} alt="" />
              </div>
            </div>
            <div className='container mx-auto mt-4 md:mt-6 p-6 md:p-10 rounded-3xl md:w-[540px] bg-white'>
              <h1 className='text-[23px] md:text-[31.5px] font-bold tracking-wide'>Spending - Last 7 days</h1>
              <canvas ref={chartRef} className='mt-10'></canvas>
              <hr className='my-4 md:my-8 mx-3 border-gray-300' />
              <div className='flex justify-between md:px-3'>
                <div>
                  <h3 className='text-gray-400 text-md'>Total this month</h3>
                  <h1 className='text-[32px] md:text-5xl font-bold'>$478.33</h1>
                </div>
                <div className='justify-items-end place-content-end'>
                  <p className='font-bold'>+2.4%</p>
                  <p className='text-gray-400'>from last month</p>
                </div>
              </div>
            </div>
        </main>
    </div>
  )
}

export default Expenses