import React from 'react'
import Chart from './chart'
import Piechart from './piechart'
const Homedash = () => {
  return (
    <div className=' p-5 rounded   flex gap-5'>
        <div className='p-3 bg-green-100  dark:bg-slate-500 shadow-2xl rounded  w-1/2 h-80'>
         {/* <div className='justify-center  flex mb-3'>Equipe</div>
            
            <Linechart /> */}
            <Piechart />
           
        </div>
        <div className='bg-green-100 dark:bg-slate-500 shadow-2xl w-full rounded h-80 flex p-5' >
            <Chart/>
        </div>
    </div>
  )
}

export default Homedash