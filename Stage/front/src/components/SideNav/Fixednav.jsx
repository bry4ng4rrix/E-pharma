import { GrMail } from "react-icons/gr"; 
import { HiMail } from "react-icons/hi"; 
import { BsShopWindow } from "react-icons/bs"; 
import { RxEnvelopeClosed } from "react-icons/rx"; 
import { RxAvatar } from "react-icons/rx"; 
import { BsFillMoonFill } from "react-icons/bs"; 
import { BsFillSunFill } from "react-icons/bs"; 
import { MdOutlinePermPhoneMsg } from "react-icons/md"; 
import { MdOutlineBackupTable } from "react-icons/md"; 
import { MdOutlineAssuredWorkload } from "react-icons/md"; 
import { MdOutlineAssignmentLate } from "react-icons/md"; 
import React from "react";
import logo from "../../assets/img/logo.png";

import { Link } from 'react-router';
import { useState } from 'react';
const Fixednav = ({darkMode ,toogleDark}) => {

  const [nav,setNav] = useState();
  const navlink = [
    {nom: "Acceuil" ,link : "/", icon :MdOutlineAssuredWorkload  },
    {nom: "Activite"  ,link : "/", icon : MdOutlineBackupTable  },
    {nom: "Conseil"  ,link : "/", icon :MdOutlineAssignmentLate   },
    {nom: "Contact"  ,link : "/", icon : MdOutlinePermPhoneMsg  },
  ];
  return (
     <div className=" hidden  sm:flex h-12  dark:text-fond text-fonddark m-3 p-5 justify-between items-center ">
                    <div className="font-bold ">
                      <img src={logo} alt="logo"  className="h-16 w-auto"/>
                    </div>
                    <div className='hidden  md:flex gap-5 font-bold text-sm self-center rtl:justify-end'>
                      {navlink?.map((a,i) =>(
                        <Link
                          key={i}
                          className=' hover:text-vertdark p-2 rounded-md cursor-pointer'
                          to={a?.link}
                        ><div className="flex gap-2 items-center">{a.nom}</div></Link>
                      ))}
                      
                    </div>
                    <div className="justify-end flex gap-2 items-center">
                      <button className=" dark:text-green-100 rounded-full " onClick={toogleDark}> {darkMode? <BsFillSunFill /> :<BsFillMoonFill /> }</button>
                    

                    </div>
                  
    </div>
  )
}

export default Fixednav