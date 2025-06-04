
import { useEffect, useState } from "react";
import Sidebar from "../../components/SideNav/Sidebard"
import Dashcard from "../../ui/card/Dashcard";
import Table from "../../ui/card/Table";
import Fixednav from "../../components/SideNav/Fixednav"
import Homedash from "../../components/Contenue/homedash";


const App = () => {
    const [lien,setLien] = useState('Home')

   

    const [darkMode,setDarkMode] = useState(false);
    const toogleDark = () =>{
        setDarkMode(!darkMode)
        localStorage.setItem('darkMode', darkMode);

    }
  
    return (
      
        <section className={` ${darkMode &&'dark'} flex gap-1 h-full bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

          
            
          
              {/* sidebard */}
              <Sidebar  setLien={setLien}/>  
              
              {/* navbar */}

              {/* contenu */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                <Dashcard />

                
                <div className="">
                    <Homedash />
                </div>
            </div>
            
                
              
        </section>
  
    );
    }

export default App;