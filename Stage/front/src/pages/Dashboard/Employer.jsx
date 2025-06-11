import { AiFillCloseCircle } from "react-icons/ai"; 
import { AiOutlineUser } from "react-icons/ai"; 

import { AiOutlineUserAdd } from "react-icons/ai"; 
import { AiOutlineUserDelete } from "react-icons/ai"; 
import { BiEdit } from "react-icons/bi"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useEffect, useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import {motion} from 'framer-motion'

import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('access_token');

const Employer = () => {
        const [darkMode,setDarkMode] = useState(false);
        const [ajoutform,setAjoutform] = useState(false);
        const [Nom,setNom] = useState('');
        const [Prenom,setPrenom] = useState('');
        const [Email,setEmail] = useState('');
        const [Codemember,setCodemember] = useState('');
        const [Password,setPassword] = useState('');
        const [Password1,setPassword1] = useState('');
        const [is_staff,Setis_staff] = useState('')
        const [employer, setEmployer] = useState([]);


    const [loading, setLoading] = useState(true);

    const openajoutform = () => setAjoutform(true);
    const closeajoutform = () => setAjoutform(false);

    useEffect(() => {
       const   fetchEmployers = async () => {
        try {
             setLoading(true);
            const response = await fetch('http://localhost:8000/employer' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
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
       fetchEmployers();
    },[])
const supre = async(id) => {
  try {
    const response = await fetch(`http://localhost:8000/employer/supr/${id}`,{
      method:'DELETE',
      header :{
        'Authorization': `Bearer $(token)`,
        'Content-type': 'application/json',
      },
      body : JSON.stringify({id}),
    });

    const data = await response.json();
    if(response.ok){
      toast.success("Supression Success")
    }else {
      toast.error('Erreur de la supression')

    }
  }
  catch {

  }
}

    const Save = async (e) => {
        setEmployer(true)
        e.preventDefault();
       
           // Réinitialiser les erreurs précédentes
           toast.dismiss();
       
           if (!Nom || !Prenom || !Codemember || !Email || !Password || !Password1) {
             toast.error("Veuillez remplir tous les champs", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
             });
             return;
           }
           if (Password !== Password1) {
             toast.error("Les deux mot de passe ne corespond pas", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
             });
             return;
           }
         
       
           const data = {
             first_name: Nom,
             last_name: Prenom,
             member_code: Codemember,
             email: Email,
             password: Password,
             password1: Password1,
             is_staff :is_staff
           };
       
           try {
             const response = await fetch("http://localhost:8000/register/", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
             });
       
             const responseData = await response.json();
       
             if (response.ok) {
               toast.success("Inscription réussie ! Redirection...", {
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
               });
               // Rediriger vers la page de connexion après un délai
               setTimeout(() => {
                 window.location.href = "/admin/employer";
               }, 2000);
             } else {
               // Gestion des erreurs de validation
               if (response.status === 400) {
                 // Afficher les erreurs de validation
                 Object.entries(responseData).forEach(([field, errors]) => {
                   // Si c'est une liste d'erreurs
                   if (Array.isArray(errors)) {
                     errors.forEach(error => {
                       toast.error(`${field}: ${error}`, {
                         position: "top-right",
                         autoClose: 5000,
                         hideProgressBar: false,
                         closeOnClick: true,
                         pauseOnHover: true,
                         draggable: true,
                       });
                     });
                   } else {
                     // Si c'est une erreur simple
                     const errorMessage = field === 'email' && errors.includes('déjà utilisée') 
                       ? 'Email déjà pris' 
                       : `${field}: ${errors}`;
                     
                     toast.error(errorMessage, {
                       position: "top-right",
                       autoClose: 5000,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: true,
                     });
                   }
                 });
               } else {
                 // Autres types d'erreurs
                 toast.error("Une erreur est survenue lors de l'inscription", {
                   position: "top-right",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                 });
               }
             }
           } catch (error) {
             console.error("Erreur réseau :", error);
             toast.error("Erreur de connexion au serveur. Veuillez réessayer.", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
             });
           }
         


    }
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
                                <div className=" font-inter my-5 flex items-end justify-between">
                                    Liste des Employer 
                                    <button className="flex items-center gap-2 p-3
                                    text-sm px-4 text-white bg-blue-500 rounded  hover:bg-vert hover:shadow-xl" onClick={openajoutform}><AiOutlineUserAdd className="text-lg" /> Nouveau</button>
                                </div>
                            <div className="grid  sm:grid-cols-3 gap-2 ">
                                   
                                   {employer.map((employer) =>(
                                     <div key={employer.id}  className="bg-green-500/50 w-4/3 text-white backdrop-blur h-28 justify-between 
                                        shadow-lg items-center px-3 rounded grid grid-cols-3">
                                        <div  className="bg-white  h-24   w-24 rounded-full  justify-start">
                                        </div>
                                        <ul className="text-sm">
                                            <li>{employer.username}</li>
                                            <li>{employer.email}</li>
                                            <li>{employer.member_code}</li>
                                            <li>{employer.poste}</li>
                                        </ul>
                                        
                                        <div className="flex gap-4 justify-end ">
                                            <button className="text-2xl"><BiEdit /></button>
                                            <button className="text-2xl" ><AiOutlineUserDelete onClick={() =>supre(employer.id)} /></button>
                                        </div>
                                    </div>

                                   ))}
                                   
                                  


                            
                            
                                
                            
                            </div>
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
                    <div className="bg-white rounded-lg shadow-wl w-full max-w-2xl p-2">
                       
                       <div className=" flex justify-between mx-5 bg-white rounded">
                        <span></span>
                            <AiOutlineUser className="h-16 w-auto m-5" />
                            <button className="flex text-end items-center" onClick={closeajoutform}><AiFillCloseCircle className="text-red-500 h-6 w-auto" /></button>

                       </div>
                       <div className="grid grid-cols-1 gap-2 p-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="Nom" onChange={(e) => setNom(e.target.value)}/>
                                    <input type="text"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="Prenom" onChange={(e) => setPrenom(e.target.value)}/>
                            </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                    <input type="text"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="Code Member"onChange={(e) => setCodemember(e.target.value)}/>
                                    <input type="File"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="Photo de Profile"/>
                            </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                                    <input type="text"  className="border border-vertsombre outline-none h-12 p-2 text-sm rounded-sm shadow-lg" placeholder="Password " onChange={(e) => setPassword1(e.target.value)}/>
                            </div>
                            <button  className="bg-blue-500 rounded p-3  text-white mt-5 hover:bg-vert" onClick={Save}>Enregistre</button>
                       </div>
                    </div>
                </motion.div>
            )}
               
            </div>
            
                
              
        </section>
          )
}

export default Employer 