
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebard"
import Dashcard from "../ui/card/Dashcard";
import Table from "../ui/card/Table";
import Fixednav from "../ui/navbar/Fixednav";


const App = () => {

    const [darkMode,setDarkMode] = useState(false);
    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
  
    return (
      
        <section className={` ${darkMode &&'dark'} flex gap-6 bg-slate-400 fd `}>

          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}

              {/* contenu */}
            <div className=" m-3 text-xl text-gray-900 font-semibold  w-full rounded-lg bg-green-100 shadow-lg bg-opacity-80 dark:bg-slate-800 dark:text-green-100 transition-colors">
               
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