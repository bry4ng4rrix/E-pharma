import { BsTrash3Fill } from "react-icons/bs"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'


const Rendevous = () => {
        const [darkMode,setDarkMode] = useState(false);
    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
  
    return (
      
       <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}

                  {/* contenue */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                
                <div className=" min-h-screen p-5 text-vertsombre">

                    <div className="text-vertsombre">
                        rendevous des clients  

                    </div>
                    <div className="w-full h-screen p-3  justify-center gap-5 m-1 border border-dashed border-vertsombre  rounded-md">
                            <div className="p-5 m-1 rounded-md h-28 w-full bg-green-100 flex justify-between items-center ">
                                    <div>
                                        <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ex.</p>
                                    </div>
                                    <div className="hover:text-red-600  cursor-wait m-5">
                                        <BsTrash3Fill />
                                    </div>
                                
                            
                            </div><div className="p-5 m-1 rounded-md h-28 w-full bg-green-100 flex justify-between items-center ">
                                    <div>
                                        <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ex.</p>
                                    </div>
                                    <div className="hover:text-red-600  cursor-wait m-5">
                                        <BsTrash3Fill />
                                    </div>
                                
                            
                            </div><div className="p-5 m-1 rounded-md h-28 w-full bg-green-100 flex justify-between items-center ">
                                    <div>
                                        <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ex.</p>
                                    </div>
                                    <div className="hover:text-red-600  cursor-wait m-5">
                                        <BsTrash3Fill />
                                    </div>
                                
                            
                            </div><div className="p-5 m-1 rounded-md h-28 w-full bg-green-100 flex justify-between items-center ">
                                    <div>
                                        <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ex.</p>
                                    </div>
                                    <div className="hover:text-red-600  cursor-wait m-5">
                                        <BsTrash3Fill />
                                    </div>
                                
                            
                            </div>
                    </div>
                </div>
                

               
            </div>
            
                
              
        </section>
          )
}

export default Rendevous 