import { BiUserCircle } from "react-icons/bi"; 
import { BiRocket } from "react-icons/bi"; 
import Navbar from '../../components/SideNav/landingnav'
import wosh from '../../assets/img/womanshoping.png'
import logo from '../../assets/img/logo.png'
import Chat from './chat'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Landing = () => {
const navigate = useNavigate();
const [text, setText] = useState("");
const is_active = localStorage.getItem("is_active");
const member_code = localStorage.getItem("member_code");


console.log(is_active ,'dezfzef')
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
                     <div className=" flex  h-16 fixed top-0 left-0 right-0 justify-between items-center p-5 gap-6">
                       
                                           <div>
                                               <img src={logo} alt="" className='h-16' />
                                           </div>
                                           <div className="w-20"></div>
                       
                                           <div>
                                               <ul className='hidden justify-start  md:flex gap-10 font-inter  text-vertsombre font-semibold' >
                                                   <li><a href="/"></a>Home</li>
                                                   <li><a href="#About ">About</a></li>
                                                   <li><a href="/Chat"></a>Chat</li>
                                                   <li><a href="/"></a>Contact</li>
                                                   <li><a href="/admin">Tableau de bord</a></li>
                                                   
                                               </ul>
                                           </div>
                       
                                           <div className='gap-2 flex items-center'>
                                                    <div className={`bg-vertdark text-white px-5 py-2 rounded font-bold font-inter flex items-center gap-2 ${is_active ? 'block':'hidden'}`}><BiUserCircle /> {member_code}</div>
                                               <button
                                                 className={`bg-vertdark shadow-2xl text-lime-50 px-5 py-2 rounded font-bold font-inter ${is_active ? 'hidden':'block'}`}>
                                                <a href="/login" className="flex gap-2">Se connecter </a>
                                                </button>
                                                <button
                                                 className={`bg-vertdark shadow-2xl text-lime-50 px-5 py-2 rounded font-bold font-inter ${!is_active ? 'hidden':'block'}`} onClick={handleLogout}>
                                                    Se deconnecter
                                                </button>
                                            </div>
                                           
                                           
                       
                                       </div>

                <section className='h-screen flex justify-center  items-center  bg-gradient-to-tr from-vertblanc via-teal-400 to-vertblanc p-10  '>
                    <div className='  h-screen justify-center flex flex-col p-20 items-start '>
                        {/* gauche */}
                        <div className='text-5xl font-bold font-istok text-vertsombre'>
                            TONGASOA IANAO !
                        </div>
                        <div className='flex w-1/2 mt-3 m-2 font-inter'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, tempore. Autem tempora error facere qui vitae eos atque, dolore itaque ex eveniet porro 
                        </div>
                        <div>
                            <button className='h-12 m-2 bg-vert mt-20 px-10 rounded text-white font-bold text-lg shadow-lg hover:bg-gray-400' 
                            onClick={speakt}>Voire plus</button>
                        </div>
                    </div>
                    <div className=' w-screen justify-center items-center flex p-10'>

                        {/* droite */}
                        <img src={wosh} alt="" className='block md:h-1/2 lg:h-3/4 ' />
                    </div>
                </section>
                
                
                
                <section id='#About' className='h-screen flex bg-white'>
                    <Chat />
                </section>
                
            </div>
    )
}

export default Landing