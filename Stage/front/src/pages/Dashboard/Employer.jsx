import { BsFillTrashFill } from "react-icons/bs"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useEffect, useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import {motion} from 'framer-motion'
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('access_token');

const Employer = () => {
        const [darkMode,setDarkMode] = useState(false);
        const [employer, setEmployer] = useState([]);


    const [loading, setLoading] = useState(true);

    const [supr,setsupr] = useState(false)
    const opensupr = () => setsupr(true);
    const closesupr = () => setsupr(false);
    const [curentid,setCurentid] = useState('')

    const suprimer = (id) => {
      setCurentid(id)
        opensupr()
    }

    const asupr = async () => {
      const data = {
        is_staff : false,
        poste : 'membre',

      }
      try {
            const response =  await fetch (`http://localhost:8000/api/user/${curentid}/`,{
              method : 'PATCH',
              headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data),
            });
            if(response.ok){
              toast.success("Employe suprimée avec success")
              fetchEmployers()
              setTimeout(() => {
              closesupr()
            }, 1000);
            }
      }
      catch (error) {
        toast.error('error')
        console.log(error)

      }
    }


    useEffect(() => {
       if(token){
        fetchEmployers();
       }
    },[])
    const   fetchEmployers = async () => {
        try {
             setLoading(true);
            const response = await fetch('http://localhost:8000/employer' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setEmployer(data);

        }
        catch (error){
                console.error('erreur')
                setLoading(false)
        }
       };

    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
   
   
  
    return (
      
        <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            pauseOnHover
            transition={Bounce}
            limit={5}
          />
          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}

                  {/* contenue */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                
                <div className=" min-h-screen p-5 text-vertsombre">

                    <div className="text-vertsombre">
                     
                    </div>
                    <div className="w-auto p-3  justify-center   border-vertsombre  rounded-sm">
                                <div className=" font-inter my-5 flex items-end justify-between dark:text-vertblanc">
                                    Liste des Employer 
                                   
                                </div>
                            <div className="grid  md:grid-cols-3   gap-5 ">
                                   
                                   {employer.map((employer) =>(
                                     <div key={employer.id}  className="bg-green-500 min-w-80 w-full  text-white backdrop-blur h-28 justify-between 
                                        shadow-lg items-center px-3 rounded-lg grid grid-cols-3">
                                       <img src={employer.image} alt="" className="bg-white h-24 w-24 rounded-full  justify-start"/>
                                        <ul className="text-sm">
                                            <li>{employer.first_name} {employer.last_name}</li>
                                            <li>{employer.email}</li>
                                            <li>Code : {employer.member_code}</li>
                                            <li>Poste:{employer.poste}</li>
                                        </ul>
                                        
                                        <div className="flex gap-4 justify-end ">
                                           
                                            <button className={`${employer.is_superuser ? "hidden": "block"} text-2xl text-red-500 bg-vertblanc rounded-full p-2 hover:bg-red-500 hover:text-vertblanc hover:cursor-wait`}><BsFillTrashFill onClick={() =>suprimer(employer.id)} /></button>
                                        </div>
                                    </div>

                                   ))}
                                   
                                  {supr && (
                                     <motion.div 
                                          className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-5"
                                          initial={{ opacity: 0  }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          transition={{ duration: 0.5 }}
                                                   >
                                      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded p-3">
                                        <div className="text-center m-5 text-white">
                                          Confirmez ?
                                        </div>
                                          <div className="grid grid-cols-2 gap-6">
                                            <button className="bg-green-500 rounded h-10 text-white hover:bg-green-600" onClick={asupr}>OUI</button>
                                            <button className="bg-red-500 rounded h-10 text-white hover:bg-red-700" onClick={closesupr}>NON</button>

                                          </div>

                                      </div>
                                      
                                      </motion.div>
                                  )}


                            
                            
                                
                            
                            </div>
                    </div>
                    
                </div>
                

           
               
            </div>
            
                
              
        </section>
          )
}

export default Employer 