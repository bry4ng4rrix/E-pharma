import { AiFillGithub } from "react-icons/ai"; 
import { BiHomeAlt2 } from "react-icons/bi"; 
import { BiUserCheck } from "react-icons/bi"; 

import React from 'react'


const Navbar = () => {
    return (
        <nav className="fixed bg-slate-800 flex justify-between items-center
            gap-6 py-3 px-4 left-1/2 translate-x-[-50%] top-[20px]
            rounded-full backport-blur-md bg-opacity-80 text-white shadow-lg z-10">

          
            <button className="cursour-pointer hover:text-green"><BiHomeAlt2 className="text-2xl " /></button>
            <ul className="md:hidden lg:flex gap-8 text-lg">
               
                    <li className='flex relative group cursor-pointer  hover:text-green-400'>Home</li>
                    <li className='flex relative group cursor-pointer  hover:text-green-400'>About</li>
                    <li className='flex relative group cursor-pointer  hover:text-green-400'>Service</li>
                    <li className='flex relative group cursor-pointer  hover:text-green-400'>Contact</li>
                      

            </ul>
            
            <button className='bg-green-800 flex px-6 py-3 rounded-full shadow-2xl text-white text-md
            font-semibold'><BiUserCheck className="text-2xl mr-2"/>Authentifier</button>
            
        </nav>
    )

    
}

export default Navbar