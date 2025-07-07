import { CgProfile } from "react-icons/cg"; 
import { RiMessage3Line } from "react-icons/ri"; 
import { SiHomeadvisor } from "react-icons/si"; 
import { FcHome } from "react-icons/fc"; 
import React from 'react'

const Landing = () => {
  return (
    <div className='h-screen w-full p-3 '>
        <div className='bg-slate-950 shadow-lg h-full rounded-lg text-white p-2'>
            <div className='flex justify-between '>
                <div className='text-lg font-bold'>
                    <FcHome  className="h-5 w-auto"/>
                </div>
                <div>
                    <ul className='flex gap-6 font-semibold'>
                        <li className="flex "><SiHomeadvisor />Blog</li>
                        <li><RiMessage3Line />Message</li>
                        <li><CgProfile />Profile</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing