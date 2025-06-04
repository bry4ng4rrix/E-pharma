import React from 'react'
import Areachart from '../../ui/Chart/recharts/piechart'
import Linechart from '../../ui/Chart/linechart'
const Homedash = () => {
  return (
    <div className=' p-5 rounded  shadow-xl flex gap-5'>
        <div className='p-3 bg-green-100  rounded h-auto w-1/2'>
         <div className='justify-center  flex mb-3'>Equipe</div>
            
            <Linechart />
           
        </div>
        <div className='bg-white w-full rounded h-auto flex' >
           
        </div>
    </div>
  )
}

export default Homedash