import { BiCheckCircle } from "react-icons/bi"; 
import { BsTrash3Fill } from "react-icons/bs"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useEffect, useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import {motion} from 'framer-motion'



import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Rendevous = () => {


                // const fetch =  async () = {
                    
                // }

        const [utilisateur,setUtilisateur] = useState([]);

        const fetchUser = async ()  => {

            try {
                const response = await fetch("http://localhost:8000/api/userc", {
                    method : "GET",
                    headers : {
                        "Content-type": "application/json",
                    },
                });
                const responseData = await response.json();
                setUtilisateur(responseData)
            }
            catch {
                
            }

        }
useEffect(() => {
     fetchUser();
  }, []);
  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.40, // délai entre chaque item
    },
  },
};
const [confirm,setconfirm] = useState(false);
const [accepte,setAccept] = useState(false)
const openAccepte = () => setAccept(true)
const closeAccepte = () => setAccept(false)
const openConfirm = () => setconfirm(true)
const closeConfirm = () => setconfirm(false)

const [curentid,setCurentid] = useState()



const onedelete = async () => {
    console.log('fafana ianao ')
    try {
            const response = await fetch(`http://localhost:8000/api/userc/${curentid}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
           if (!response.ok) {
            throw new Error(`Erreur suppression (${response.status})`);
          }
          toast.success('Utilisateur rejetée ');
          closeConfirm()
          fetchUser()

    }
    catch {
                toast.error('Erreur de supression')
            }
}

const btnconfirm = async () => {
    const data = {
        confirmed : true
    }
    try {
        const response = await fetch(`http://localhost:8000/api/userc/${curentid}/`,{
            method: 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data),
        });
         if(response.ok){
                      toast.success("Nouveau Membre Confirmée")
                      fetchUser()
                      setTimeout(() => {
                      closeAccepte()
                    }, 1000);
        
                    }
    }
    catch {

    }


}

const btndelete = async (id) => {
    setCurentid(id)
    openConfirm()
}

const oneaccepte = async (id) => {
    setCurentid(id)
    openAccepte()
}


        const [darkMode,setDarkMode] = useState(false);
         const toogleDark = () =>{
        setDarkMode(!darkMode)

    }

  
    return (
      
       <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}
                                <ToastContainer
                                      position="top-right"
                                      autoClose={3000}
                                      hideProgressBar={false}
                                      newestOnTop={false}
                                      closeOnClick
                                      rtl={false}
                                      pauseOnFocusLoss
                                      draggable
                                      theme="light"
                                      pauseOnHover
                                      transition={Bounce}
                                    />
                  {/* contenue */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                
                <div className="  p-5 text-vertsombre">

                    <div className="text-vertsombre p-3 m-2">
                       Demande d'authentification 

                    </div>
                        {confirm && (
                             <motion.div 
                                    initial={{ opacity: 0  }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="fixed inset-0 bg-black/80 backdrop-blur
                                                z-50 flex items-center justify-center p-5"
                                    >    <div></div>
                                                <div className="max-w-sm bg-black/50 p-5 m-5 grid grid-cols-1 gap-5 rounded  w-full">
                                                <div className="text-lime-50 text-center text-lg font-bold">
                                                    Suprimer
                                                </div>
                                                <div className="grid grid-cols-2 gap-5"> 

                                                <button className=" flex  w-full text-white bg-green-500 p-1 rounded justify-center hover:bg-vertblanc hover:text-vertsombre"  onClick={onedelete}>Oui</button>
                                                <button className=" flex  w-full text-white bg-red-500 p-1 rounded justify-center hover:bg-red-800" onClick={closeConfirm} >Non</button>
                                                
                                                </div>
                                                
                                </div>
                        </motion.div>
                        )}
                        {accepte && (
                             <motion.div 
                                    initial={{ opacity: 0  }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="fixed inset-0 bg-black/80 backdrop-blur
                                                z-50 flex items-center justify-center p-5"
                                    >    <div></div>
                                                <div className="max-w-sm bg-black/50 p-5 m-5 grid grid-cols-1 gap-5 rounded  w-full">
                                                <div className="text-lime-50 text-center text-lg font-bold">
                                                    Confirmer
                                                </div>
                                                <div className="grid grid-cols-2 gap-5"> 

                                                <button className=" flex  w-full text-white bg-green-500 p-1 rounded justify-center hover:bg-vertblanc hover:text-vertsombre"  onClick={btnconfirm}>Oui</button>
                                                <button className=" flex  w-full text-white bg-red-500 p-1 rounded justify-center hover:bg-red-800" onClick={closeAccepte} >Non</button>
                                                
                                                </div>
                                                
                                </div>
                        </motion.div>
                        )}

                    <motion.div
                        
                                                          
                    className="w-full h-96 p-3  justify-center gap-2 m-1 border border-dashed border-vertsombre grid grid-cols-1 sm:grid-cols-2  rounded-md overflow-y-auto scrollbar-none">
                           {utilisateur.map((util,index) => (
                         <motion.div 
                            key={util.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-5 shadow-lg rounded-md h-28 w-full bg-green-100  ">
                                    <div className="flex   justify-between">
                                        <img src={util.image} className="h-20  w-auto rounded-lg"/>
                                        <div className="   mx-4">
                                            <p className="text-sm"> Nom : {util.first_name} </p>
                                            <p className="text-sm"> Prenom : {util.last_name}</p>
                                            <p className="text-sm"> Email : {util.email}</p>
                                            <p className="text-sm"> Code : {util.member_code}</p>
                                        </div>
                                        <div className="space-x-5 justify-center items-center flex ">
                                            <button className="hover:text-green-500   cursor-pointer " onClick={() =>oneaccepte(util.id)}> <BiCheckCircle className="h-7 w-auto" /></button>
                                            <button className="hover:text-red-600  cursor-pointer " onClick={() =>btndelete(util.id)}><BsTrash3Fill className="h-7 w-auto" /></button>
                                        </div>
                                    </div>
                                    
                                
                            
                            </motion.div>

                           ))}
                            
                            
                            
                            
                            
                    </motion.div>
                </div>
                

               
            </div>
            
                
              
        </section>
          )
}

export default Rendevous 