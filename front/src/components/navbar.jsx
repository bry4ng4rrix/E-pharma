import { useState } from "react";
import { Link } from "react-router";
const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  }
  const content = 
  <>
  <div className="lg:hidden md:hidden block absolute top-16 w-full left-0 right-0 transition bg-slate-800">
                <ul className="text-center text-xl p-20">
                  <Link spy={true} smooth={true} to="Home"><li className="my-4  border-slate-950 hover:rounded hover:bg-cyan-700">Home</li></Link>
                  <Link spy={true} smooth={true} to="landing"><li className="my-4  border-slate-950 hover:rounded hover:bg-cyan-700">About</li></Link>
                  <Link spy={true} smooth={true} to="service"><li className="my-4  border-slate-950 hover:rounded hover:bg-cyan-700">Service</li></Link>
                </ul>
  
  </div>
  
  
  </>

    return (
      <nav className="bg-slate-800 justify-between "> 
        <div className=" flex mx-5   text-white py-4">
          <div className="gap-6  items-center justify-center">
            <span className="text-2xl font-bold">logo</span>
          </div>
          <div className="lg:flex md:flex lg:flex-auto ml-3/5 items-center justify-center font-normal hidden">
           
                <ul className="flex gap-8  text-[18px]">
                  <Link spy={true} smooth={true} to="Home"><li className="hover:text-cyan-400 transition  hover:border-cyan-800 cursor-pointer">Home</li></Link>
                  <Link spy={true} smooth={true} to="landing"><li className="hover:text-cyan-400 transition  hover:border-cyan-800 cursor-pointer">About</li></Link>
                  <Link spy={true} smooth={true} to="service"><li className="hover:text-cyan-400 transition  hover:border-cyan-800 cursor-pointer">Service</li></Link>
                  <Link spy={true} smooth={true} to="service"><li className="hover:text-cyan-400 transition  hover:border-cyan-800 cursor-pointer">Service</li></Link>
                </ul>
                
          
            
          </div>
          <div className="">
              <ul className="flex gap-6">
                <li>login</li>
                <li>register</li>
              </ul>
            </div>
         
        </div>
       
      </nav>
    )
  }
  
  
  export default Nav;