import { BsCheckAll } from "react-icons/bs"; 
import { BsPersonAdd } from "react-icons/bs"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import Dgrid from '../../ui/grid/grid_membre'
import Ajoumembre from "./options/ajoumembre";

import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Membre = () => {
    const [darkMode,setDarkMode] = useState(false);
    const [ajout,setAjout] = useState(true);

    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
    const toogleAdd = () =>{
        setAjout(!ajout)
        toast.success(ajout)
    }
  
    return (
      
       <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}
       {/* contenue */}
            <div className=" m-3 text-xl   font-semibold  w-full rounded-sm bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            pauseOnHover
            transition={Bounce}
          />
                    <div className="p-3">
                        <div className="flex justify-between py-5">
                           <div>
                                 
                                 <div>
                                    
                                 </div>

                           </div>
                            <div className="justify-center flex-col ">
                                <button className={`bg-vertdark text-green-50 rounded-md  hover:bg-vert
                                                    px-6 w-40 text-lg p-2 flex gap-5  items-center shadow-xl ${!ajout && 'hidden'}`} onClick={toogleAdd}>
                                     <BsPersonAdd className="h-6 w-auto" />Ajouter</button>


                                     
                            </div>
                            
                        </div>
                        <div className={`${!ajout && 'hidden'}`}>
                           <Dgrid/> 
                        </div>
                         
                         <div className={`${ajout && 'hidden'}`}>
                            <Ajoumembre toogleAdd={toogleAdd}/>
                         </div>
               
              </div>

            </div>
            
                
              
        </section>
          )
}

export default Membre 