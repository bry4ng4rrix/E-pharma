
import { useEffect, useState } from "react";
import Sidebar from "../../components/SideNav/Sidebard"
import Dashcard from "../../ui/card/Dashcard";
import Table from "../../ui/card/Table";
import Fixednav from "../../components/SideNav/Fixednav"
import Linechart from "../../ui/Chart/linechart";


const App = () => {

    const [darkMode,setDarkMode] = useState(false);
    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
  
    return (
      
        <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}

              {/* contenu */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                <Dashcard />

                <Table />
                <div className="m-5">
                </div>
            </div>
            
                
              
        </section>
  
    );
    }

export default App;