import { AiFillCloseCircle } from "react-icons/ai"; 
import { BsCheckAll } from "react-icons/bs"; 
import { BsPersonAdd } from "react-icons/bs"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import Dgrid from '../../ui/grid/grid_membre'
import Ajoumembre from "./options/ajoumembre";
import {motion} from 'framer-motion'

import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('access_token');

const Membre = () => {
    const [darkMode,setDarkMode] = useState(false);
    const [ajoutform,setAjoutform] = useState(false);
     const[Member_name,setMember_name] = useState('');
      const[Member_Code,setMember_Code] = useState('');
      const[Depth,setDepth] = useState('');
      const[Directline,setDirectline] = useState('');
      const[Sponsor,setSponsor] = useState('');
      const[Reg_Date,setReg_Date] = useState('');
      const[Grade,setGrade] = useState('');
      const[Gbv,setGbv] = useState('');
      const[Cpbv,setCpbv] = useState('');
      const[Cnbv,setCnbv] = useState('');
      const[Pbv,setPbv] = useState('');
      const[Tnbv,setTnbv] = useState('');
      const[Branch,setBranch] = useState('');

    const openajoutform = () => setAjoutform(true);
    const closeajoutform = () => setAjoutform(false);

    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
    const toogleAdd = () =>{
        setAjout(!ajout)
        toast.success(ajout)
    }

    const submite = async (e) =>{
        toast.dismiss()
        e.preventDefault();
        if(!Member_Code || !Member_name || !Depth || !Directline||!Sponsor||!Reg_Date||
                  !Grade||!Gbv||!Cpbv||!Cnbv||!Pbv||!Tnbv||!Branch){
                    console.log(Member_Code,Member_name,Depth,Directline,Sponsor,Reg_Date
                        ,Grade,Gbv,Cpbv,Cnbv,Pbv,Tnbv,Branch
                    )
                  toast.error('veuiller remplire tous les champs')
                }
                else {
                    const data = {
                  member_code : Member_Code,
                  member_name: Member_name ,
                  depth : Depth,
                  directline: Directline,
                  sponsor : Sponsor,
                  registration_date : Reg_Date,
                  grade : Grade,
                  gbv : Gbv,
                  cpbv : Cpbv,
                  cnbv : Cnbv,
                  pbv : Pbv,
                  tnbv : Tnbv,
                  branch : Branch
                }
                try{
                    const response = await fetch("http://localhost:8000/profile/create/", {
                method: "POST",
                headers: {
                    Authorization : `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
        
              const responseData = await response.json();
        
                }
                catch {
                    toast.error('erreur')
                }
                toast.success('Nouveau Membre ajoutée')
                setAjoutform(false)
                }
        
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
                                                    px-6 w-40 text-lg p-2 flex gap-5  items-center shadow-xl `} onClick={openajoutform}>
                                     <BsPersonAdd className="h-6 w-auto" />Ajouter</button>


                                     
                            </div>
                            
                        </div>
                        <div >
                           <Dgrid/> 
                        </div>
                         
                        
               
              </div>

              {ajoutform && (
                <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4" 
                     
                     initial={{opacity:0}}
                     animate={{opacity:1}}
                     exit={{opacity:0}}
                     transition={{duration:0.5}}
                >
                    <div className="bg-green-200 rounded-xl shadow-wl w-full max-w-md p-6">
                            <div className="flex m-1 justify-between">
                                <span className="text-vertsombre font-semibold">Ajouter un membre </span>
                                <button onClick={closeajoutform}><AiFillCloseCircle  className="text-vertsombre h-6 w-auto"/></button>
                            </div>

                            <div className="grid grid-cols-1 mt-10 gap-5 text-vertclaire ">
                               
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" className="h-10 rounded p-2 shadow-xl placeholder:text-md  placeholder:font-bold placeholder:text-vertclaire " placeholder="Member Name" onChange={(e) => setMember_name(e.target.value)}/>
                                     <input type="date" className="h-10 rounded p-2 shadow-xl text-vertclaire" onChange={(e) => setReg_Date(e.target.value)}/>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Code" onChange={(e) => setMember_Code(e.target.value)}/>
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Directline" onChange={(e) => setDirectline(e.target.value)}/>
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Sponsor" onChange={(e) => setSponsor(e.target.value)}/>

                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Depth" onChange={(e) => setDepth(e.target.value)}/>
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Grade" onChange={(e) => setGrade(e.target.value)}/>
                                    <input type="text" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Branche"  onChange={(e) => setBranch(e.target.value)}/>

                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Gbv" onChange={(e) => setGbv(e.target.value)}/>
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Cpbv" onChange={(e) => setCpbv(e.target.value)}/>
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Cnbv" onChange={(e) => setCnbv(e.target.value)}/>

                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Pbv" onChange={(e) => setPbv(e.target.value)}/>
                                    <input type="number" className="h-10 rounded p-2 shadow-xl placeholder:font-bold placeholder:text-vertclaire" placeholder="Tnbv" onChange={(e) => setTnbv(e.target.value)}/>

                                </div>
                                <button type="submit"   className="bg-vert mt-5 rounded shadow-xl text-green-50 h-10 my-2 py-1 hover:bg-vertsombre" onClick={submite}>Enregistre</button>
                            </div>

                    </div>

                </motion.div>
              )}

            </div>
            
                
              
        </section>
          )
}

export default Membre 