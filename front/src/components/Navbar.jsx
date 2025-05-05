import { BiChat } from "react-icons/bi"; 
import { BiCalendarEdit } from "react-icons/bi"; 
import { BiBody } from "react-icons/bi"; 
import { BiHomeAlt2 } from "react-icons/bi"; 
import { BiUserCheck } from "react-icons/bi"; 
import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed bg-slate-800 flex justify-between items-center
            gap-4 py-3 px-5 left-1/2 translate-x-[-50%] top-[20px]
            rounded-2xl backport-blur-md bg-opacity-80 text-white shadow-lg z-10 ">
            
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className={`md:flex hidden gap-6 text-sm  font-bold  items-center justify-center   ${isOpen ? 'block' : 'hidden'}`}>
                <li className='flex relative group cursor-pointer hover:text-green-400'><BiHomeAlt2 className="h-6 w-6 mr-2"/><a href="/">Home</a></li>
                <li className='flex relative group cursor-pointer hover:text-green-400'><BiBody className="h-6 w-6 mr-2"/> About</li>
                <li className='flex relative group cursor-pointer hover:text-green-400'><BiCalendarEdit className="h-6 w-6 mr-2"/> <a href="/service">Service</a></li>
                <li className='flex relative group cursor-pointer hover:text-green-400'><BiChat className="h-6 w-6 mr-2"/> Contact</li>
            </div>

            <div className="flex items-center gap-4">
                <button className='bg-blue-600 rounded-lg flex px-4 py-3 shadow-2xl text-white text-sm
                    font-bold    hover:bg-green-100 hover:text-slate-900 transition-all duration-200'>
                    <BiUserCheck className="text-xl mr-2"/>Authentifier
                </button>
            </div>
        </nav>
    )
}

export default Navbar