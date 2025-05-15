import { BsFillMoonFill } from "react-icons/bs"; 
import { BsFillSunFill } from "react-icons/bs"; 
import { MdOutlinePermPhoneMsg } from "react-icons/md"; 
import { MdOutlineCalendarMonth } from "react-icons/md"; 
import { MdOutlineBackupTable } from "react-icons/md"; 
import { MdOutlineAssuredWorkload } from "react-icons/md"; 
import { MdOutlineAssignmentLate } from "react-icons/md"; 
import { MdOutlineHouseSiding } from "react-icons/md"; 
import React from "react";

import { Link } from 'react-router';
import { useState } from 'react';
const Fixednav = ({darkMode ,toogleDark}) => {

  const [nav,setNav] = useState();
  const navlink = [
    {nom: "Acceuille" ,link : "/", icon :MdOutlineAssuredWorkload  },
    {nom: "Activite"  ,link : "/", icon : MdOutlineBackupTable  },
    {nom: "Conseille"  ,link : "/", icon :MdOutlineAssignmentLate   },
    {nom: "Contact"  ,link : "/", icon : MdOutlinePermPhoneMsg  },
  ];
  return (
     <div className=" hidden  sm:flex h-12  dark:text-green-100 text-green-800 m-3 p-5 justify-between items-center ">
                    <div className="w-20">
                      
                    </div>
                    <div className='flex gap-5 font-bold text-sm self-center rtl:justify-end'>
                      {navlink?.map((a,i) =>(
                        <Link
                          key={i}
                          className='hover:text-teal-900 p-2 rounded-md cursor-pointer'
                          to={a?.link}
                        ><div className="flex gap-2 items-center">{React.createElement(a?.icon , { size: "26" })}{a.nom}</div></Link>
                      ))}
                      
                    </div>
                    <div className="justify-end">
                      <button className="dark:bg-white dark:text-green-950 rounded-full p-2" onClick={toogleDark}> {darkMode? <BsFillSunFill /> :<BsFillMoonFill />}</button>
                    </div>
                  
    </div>
  )
}

export default Fixednav