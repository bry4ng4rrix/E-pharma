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

const Landing = () => {
const navigate = useNavigate();
// const [text, setText] = useState("");
const text = 'bonjour '
const is_active = localStorage.getItem("is_active");
const is_superuser = localStorage.getItem("is_superuser");
const message = localStorage.getItem('message')
console.log(is_active,'active')
console.log(is_superuser,'superuser')

toast.success(message)
localStorage.removeItem('message')

// momban le message kely mafinaritra
const [Profile,setProfile] = useState(false)
const [Bot,setBot] = useState(false)
const [Imc,setImc] = useState(false)



const openBot = () => setBot(true)
const closeBot = () => setBot(false)
const openProfile = () => setProfile(true)
const closeProfile = () => setProfile(true)

const speakt = () => {
    if (!text.trim()) {
        console.warn("No text provided for speech synthesis");
        alert("Veuillez entrer du texte pour la synthèse vocale.");
        return;
    }

    const sp = new SpeechSynthesisUtterance(text);
    sp.lang = 'fr-FR'; // Set to French
    sp.volume = 1; // Ensure volume is audible
    sp.rate = 1; // Normal speed
    sp.pitch = 1; // Normal pitch

    const setVoiceAndSpeak = () => {
        const voices = speechSynthesis.getVoices();
        console.log("Available voices:", voices); // Debug: List voices
        const frenchVoices = voices.filter(voice => voice.lang.includes('fr'));
        if (frenchVoices.length > 0) {
            sp.voice = frenchVoices[0]; // Use first French voice
            console.log("Selected voice:", frenchVoices[0].name);
            speechSynthesis.speak(sp);
        } else if (voices.length > 0) {
            sp.voice = voices[0]; 
            console.log("No French voice found, using:", voices[0].name);
            speechSynthesis.speak(sp);
        } else {
            console.error("No voices available for speech synthesis");
            alert("Aucune voix disponible pour la synthèse vocale. Vérifiez les paramètres de votre navigateur.");
        }
    };

    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        setVoiceAndSpeak();
    } else {
        console.log("Voices not loaded yet, waiting for onvoiceschanged");
        speechSynthesis.onvoiceschanged = () => {
            setVoiceAndSpeak();
            speechSynthesis.onvoiceschanged = null; 
        };
    }
};

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
                        <div className="bg-black/20 shadow-2xl border border-white max-w-md w-full h-3/4  backdrop-blur-lg flex-col justify-between flex rounded-xl  ">
                            
      {/* En-tête du chat */}
      <div className="flex  items-center justify-between p-3  shadow-sm rounded">
        <img src={logo} alt=""  className="h-12 w-auto"/>
        <button className="mr-4 text-gray-500" onClick={closeBot}><AiFillCloseCircle  className="h-6 w-auto text-red-600"/></button>
        
      </div>

      {/* Corps du chat */}
      <div className="flex-1  p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {/* Message reçu */}
          <div className="max-w-xs bg-vert rounded-lg p-3 shadow">
            <p className="text-white">12:45 Good morning!</p>
          </div>
          {/* Message envoyé */}
          <div className="ml-auto max-w-xs bg-teal-500 text-white rounded-lg p-3 shadow">
            <p className="text-white">12:55 I just wanted to see if you wanted to hang out tomorrow</p>
          </div>
          <div className="ml-auto max-w-xs bg-teal-500 text-white rounded-lg p-3 shadow">
            <p className="text-white">12:58 Sure, what did you want to do?</p>
          </div>
          <div className="ml-auto max-w-xs bg-teal-500 text-white rounded-lg p-3 shadow">
            <p className="text-white">12:58 Sure, what did you want to do?</p>
          </div>
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="p-4 rounded-md shadow-xl">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Votre demande "
            className="flex-1 p-3  rounded-l-lg focus:outline-none "
          />
          <button className="p-3 bg-teal-500 text-white rounded-r-lg">
           <BsFillRocketTakeoffFill  className="h-6 w-auto"/>
            
          </button>
        </div>
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
                            onClick={speakt}>Voire plus</button>
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