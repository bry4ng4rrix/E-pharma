import { BsFillRocketTakeoffFill } from "react-icons/bs"; 
import { AiFillCloseCircle } from "react-icons/ai"; 
import { CgCloseO } from "react-icons/cg"; 
import { BiUserCircle } from "react-icons/bi"; 
import wosh from '../../assets/img/womanshoping.png'
import review from '../../assets/img/reviewstar.png'
import { useNavigate } from 'react-router'
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion} from 'framer-motion'
import Navbar from '../../components/SideNav/navbarmodern'
import spline from '@splinetool/react-spline'
import Conseile from "./Conseile";
import { useState } from "react";
import logo from '../../assets/img/logo.png'
import robot from '../../assets/img/robot.jpg'

const Landing = () => {
const navigate = useNavigate();
const is_active = localStorage.getItem("is_active");
const is_superuser = localStorage.getItem("is_superuser");


// momban le message kely mafinaritra
const [Profile,setProfile] = useState(false)
const [Bot,setBot] = useState(false)
const [message,setMessage] = useState("");
const [response, setResponse] = useState('');
const [Imc,setImc] = useState(false)



const openBot = () => setBot(true)
const closeBot = () => setBot(false)
const openProfile = () => setProfile(true)
const closeProfile = () => setProfile(true)

const Envoyer = async () =>{
    const res = await fetch('http://localhost:8000/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.response || data.error);
    
}

 const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await fetch('http://localhost:8000/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
            }
    toast.dismiss()
    localStorage.setItem('message','deconnection succée');

            
        } catch (error) {
            console.error('Logout error:', error);
        }

        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem('is_active');
        navigate('/');
        // Show success toast and redirect to login page
        
    };

 
    return (
            <div className="h-screen  w-full   justify-center items-center ">
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
                     <div className="  h-16 fixed top-0 left-0 right-0 justify-between items-center p-5 gap-6">
                 <Navbar is_active={is_active} is_superuser={is_superuser} handlelogout={handleLogout}  openProfile={openProfile} openBot={openBot}/>
                       
                                         
                                           
                       
                {Bot && (
                    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-black/20 shadow-2xl border border-white max-w-xl w-full h-3/4  backdrop-blur-lg flex-col justify-between flex rounded-xl  ">
                            
      {/* En-tête du chat */}
      <div className="flex  items-center justify-between p-3   shadow-sm rounded">

        <img src={logo} alt=""  className="h-12 w-auto"/>
        <button className="mr-4 text-gray-500" onClick={closeBot}><AiFillCloseCircle  className="h-6 w-auto text-red-600"/></button>
        
      </div>

      {/* Corps du chat */}
      <div className="flex-1  p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {/* Message reçu */}
          <div className="max-w-xs bg-vert rounded-lg p-3 flex  justify-between shadow">
            <p className="text-white">Je suis un assistant médical. Posez-moi des questions liées à la santé uniquement.</p>
          </div>
          {/* Message envoyé */}
          <div className="ml-auto max-w-xs bg-teal-500 text-white rounded-lg p-3 shadow">
            <p className="text-white">Par exemple : symptômes du grippe</p>
          </div>

          <div className={`max-w-xs bg-vert rounded-lg p-3 flex  justify-between shadow ${response ? 'block':'hidden'} `}>
            <p className="text-white">{response}</p>
          </div>
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="p-4 rounded-md shadow-xl">
        <div  className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Votre demande "
            className="flex-1 p-3  rounded-l-lg focus:outline-none "
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-vertlight" onClick={Envoyer}>
           <BsFillRocketTakeoffFill  className="h-6 w-auto " />
            
          </button>
        </div >
      </div>
    </div>

                       
                        
                    </motion.div>
                )}

                                          
                       
                                       </div>

                <section className='h-screen flex justify-center  items-center  bg-gradient-to-r from-vertblanc via-teal-400 to-vertblanc p-10  '>
                    <div className='  h-screen justify-center flex flex-col p-20 items-start '>
                        {/* gauche */}
                        <motion.div
                             initial={{ opacity:0 ,x:-100 }}
                            animate={{opacity : 1 , x: 0}}
                        transition ={{
                            type : "spring",
                            stiffness : 100,
                            damping: 25,
                            delay : 0.3,
                            duration:1.2
                        }}
                         className='text-5xl font-bold font-istok text-green-900'>
                            TONGASOA IANAO !
                        </motion.div>
                        <motion.div
                         initial={{ opacity:0 ,y:100 }}
                        animate={{opacity : 1 , y: 0}}
                        transition ={{
                            type : "spring",
                            stiffness : 100,
                            damping: 25,
                            delay : 0.3,
                            duration:1.2
                        }}
                        className='flex w-1/2 mt-3 m-2 font-inter'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, tempore. Autem tempora error facere qui vitae eos atque, dolore itaque ex eveniet porro 
                        </motion.div>
                        <motion.div
                         initial={{ opacity:0 ,y:100 }}
                        animate={{opacity : 1 , y: 0}}
                        transition ={{
                            type : "spring",
                            stiffness : 100,
                            damping: 25,
                            delay : 0.3,
                            duration:1.2
                        }}
                        >
                            <button className='h-12 m-2 bg-vert mt-20 px-10 rounded text-white font-bold text-lg shadow-lg hover:bg-gray-400' 
                            >Voire plus</button>
                        </motion.div>
                    </div>
                    <div className=' w-screen justify-center items-center flex p-10'>

                        {/* droite */}
                        <motion.div
                        initial={{ opacity:0 ,x:100 }}
                        animate={{opacity : 1 , x: 0}}
                        transition ={{
                            type : "spring",
                            stiffness : 100,
                            damping: 25,
                            delay : 0.3,
                            duration:1.2
                        }}
                        
                        >
                            <img src={wosh} alt="" className='block md:h-1/2 lg:h-3/4 ' />
                        </motion.div>
                    </div>
                </section>
                
                
                
                <section id='#About' className='h-screen flex p-10 justify-center bg-white'>
                  
                        <img src={review} alt="" />

                </section>

                <section className="">
                    <Conseile/>
                </section>
                
            </div>
    )
}

export default Landing