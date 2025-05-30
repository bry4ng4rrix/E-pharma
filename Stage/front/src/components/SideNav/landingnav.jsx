import React from "react";
import logo from "../../assets/img/logo.png"
const landingnav = () => {
  return (
       <div className=" flex  h-16 relative bg-white justify-between items-center p-5 gap-6">
    
                        <div>
                            <img src={logo} alt="" className='h-16' />
                        </div>
    
                        <div>
                            <ul className='hidden   md:flex gap-10 font-inter  text-vertsombre font-semibold' >
                                <li><a href="/"></a>Home</li>
                                <li><a href="#About ">About</a></li>
                                <li><a href="/Chat"></a>Chat</li>
                                <li><a href="/"></a>Contact</li>
                            </ul>
                        </div>
    
                        <div>
                           <button className='bg-vertdark shadow-2xl text-lime-50 hover:bg- hover:text-black px-5 p-2 rounded font-bold font-inter'>Se Connecte</button>
                        </div>
                        
                        
    
                    </div>
  );
};

export default landingnav;
