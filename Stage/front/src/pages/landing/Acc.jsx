 import { AiFillCloseCircle } from "react-icons/ai"; 

import wosh from '../../assets/img/womanshoping.png'
import review from '../../assets/img/reviewstar.png'
import { useNavigate } from 'react-router'
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion} from 'framer-motion'
import Navbar from '../../components/SideNav/navbarmodern'
import Conseile from "./Conseile";
import { useEffect, useState } from "react";
import Chat from "./Chat/chat";

import Message from './message/message';

const Landing = () => {
const navigate = useNavigate();
const is_active = localStorage.getItem("is_active");
const token = localStorage.getItem('access_token')
const is_superuser = localStorage.getItem("is_superuser");
const [ustilisateur,setUtilsateur] = useState([])
const [profileU,setProfileU] = useState([])

const fetchuserprofile = async()=> {
    try {
         const response = await fetch('http://localhost:8000/profiles/user' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setProfileU(data);

    }
    catch {
        
    }
}
useEffect(() => {
if(token){

fetchuserprofile();
}
},[])

const fetchUtilisateur = async()=> {
  

    try {
         const response = await fetch('http://localhost:8000/profiles/update' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setUtilsateur(data);
           
           
    }
    catch {
        
    }
}
useEffect(() => {
  if(token){

fetchUtilisateur();
  }
},[])


//mise a jours du profile 
const [image,setImage] = useState(null)
const AjoutProfile = async (e) => {
  e.preventDefault();

  if (!image) {
    toast.success("Aucune image sélectionnée !");
    return;
  }

  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch('http://localhost:8000/profiles/user/', {
      method: 'PATCH', 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Photo de profil mise à jour !");
      fetchUtilisateur();
      setTimeout(() => {
        closeProfile();
      }, 1000);
    } else {
      console.error('Erreur 400:', data);
      toast.error("Erreur lors de la mise à jour du profil");
    }

  } catch (error) {
    console.error('Erreur technique :', error);
    toast.error("Erreur technique lors de la mise à jour");
  }
};


// momban le message kely mafinaritra
const [Profile,setProfile] = useState(false)
const [message,setmessage] = useState(false)
const [Bot,setBot] = useState(false)
const [Imc,setImc] = useState(false)
const[Depth,setDepth] = useState('');const[Directline,setDirectline] = useState('');
const[Sponsor,setSponsor] = useState('');
const[Reg_Date,setReg_Date] = useState('');
const[Grade,setGrade] = useState('');
const[Gbv,setGbv] = useState('');
const[Cpbv,setCpbv] = useState('');
const[Cnbv,setCnbv] = useState('');
const[Pbv,setPbv] = useState('');
const[Tnbv,setTnbv] = useState('');
const[Branch,setBranch] = useState('');
      // State pour stocker les données du profil
const [profileData, setProfileData] = useState({});

      // PATCH pour mettre à jour le profil
      const patchProfile = async (e) => {
        e.preventDefault();
        console.log(Depth)
        const data = {
          depth : Depth || ustilisateur.depth,
          directline: Directline || ustilisateur.directline,
          sponsor : Sponsor || ustilisateur.sponsor,
          grade : Grade || ustilisateur.grade,
          gbv : Gbv || ustilisateur.gbv,
          cpbv : Cpbv || ustilisateur.cpbv,
          cnbv : Cnbv || ustilisateur.cnbv,
          pbv : Pbv || ustilisateur.pbv,
          tnbv : Tnbv || ustilisateur.tnbv,
          branch : Branch || ustilisateur.branch,

          
        }
        try {
          const response = await fetch('http://localhost:8000/profiles/update/', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            toast.success("Profil mis à jour !");
            fetchUtilisateur();
            fetchuserprofile();

            setTimeout(() => {
              closeProfile()
            }, 1000);

          } else {
            toast.error("Erreur lors de la mise à jour du profil");
          }
        } catch (error) {
          toast.error("Erreur technique lors de la mise à jour");
        }
      };



const openBot = () => setBot(true)
const closeBot = () => setBot(false)
const openProfile = () => setProfile(true)
const closeProfile = () => setProfile(false)
const openmessage = () => setmessage(true)
const closemessage = () => setmessage(false)



 

 
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
                            theme="light"
                            pauseOnHover
                            transition={Bounce}
                          />
                     <div className="  h-16 fixed top-0 left-0 right-0 justify-between items-center p-5 gap-6">
                 <Navbar is_active={is_active} is_superuser={is_superuser}  openProfile={openProfile} openBot={openBot} openmessage={openmessage}/>
                       
                          {message && (
                            <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                      <Message closemessage={closemessage} />

                            </motion.div>
                          )}           
                                           
                       
                {Bot && (
                    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                       <Chat closeBot={closeBot}/>

                       
                        
                    </motion.div>
                )}
                {Profile && (
                    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                            <div className=' max-w-4xl grid  gap-2 w-full rounded  '>
                        
                               
                                <div className='flex p-5 w-full  rounded-md'>
                                        

                                        {/* User Profile Two Columns */}
                                        <div className="w-full flex flex-row gap-8">
                                          
                                          {/* Colonne gauche : Mise à jour du profil */}
                                          <div  className="flex-1 bg-vertblanc/50 rounded-lg p-6 flex flex-col items-center shadow-md">
                                          <button className=' flex self-start' onClick={closeProfile}><AiFillCloseCircle 
                                         className="h-6 w-auto  text-red-600"/></button>
                                            {/* Photo de profil */}
                                            <div className="mb-4 flex flex-col items-center">
                                              <img
                                                src={profileU?.image || 'https://ui-avatars.com/api/?name=User'}
                                                alt="Profile"
                                               
                                                className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow"
                                              />
                                              <div className="grid grid-cols-2 gap-2 mt-3">
                                                <input
                                                type="file"
                                                accept="image/*"
                                                 onChange={(e) => setImage(e.target.files[0])}
                                                className=" p-1 rounded text-sm  "
                                              />
                                              <button onClick={AjoutProfile } className="bg-teal-500 text-white p-1  rounded shadow-md">Ajouter</button>
                                              </div>
                                            </div>

                                            <div className="grid grid-cols-2 w-full mt-3 border p-5 border-dashed rounded">
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Nom : </div>
                                                <div className="text-sm font-semibold text-slate-950">{profileU.first_name}</div>
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Prenom : </div>
                                                <div className="text-sm font-semibold text-slate-950">{profileU.last_name}</div>
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Code du membre : </div>
                                                <div className="text-sm font-semibold text-slate-950">{ustilisateur.member_code}</div>
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Email : </div>
                                                <div className="text-sm font-semibold text-slate-950">{profileU.email}</div>

                                            </div>
                                          
                                            
                                            <button
                                              type="submit"
                                              className="bg-teal-500 hover:bg-teal-600 text-white rounded px-6 py-2 w-full mt-2 shadow"
                                            > 
                                              Mise à jour
                                            </button>
                                          </div>
                                          {/* Colonne droite : Infos membre */}
                                          <div className="flex-1 bg-vertblanc/50 rounded-lg p-6 flex flex-col gap-3 shadow-md">
                                          
                                            <div className="grid grid-cols-2 gap-2">
                                              
                                              <div className="font-semibold text-vertblanc">Nom membre :</div>
                                              <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              value={ustilisateur.member_name}
                                              onChange={e => setMember_name(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">Depth :</div>
                                             <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.depth}
                                              onChange={e => setDepth(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">Directline :</div>
                                              <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.directline}
                                              onChange={e => setDirectline(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">Sponsor :</div>
                                             <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.sponsor}
                                              onChange={e => setSponsor(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">Grade :</div>
                                             <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.grade}
                                              onChange={e => setGrade(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">GBV :</div>
                                              <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.gbv}
                                              onChange={e => setGbv(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">CPBV :</div>
                                             <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.cpbv}
                                              onChange={e => setCpbv(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">CNBV :</div>
                                              <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.cnbv}
                                              onChange={e => setCnbv(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">PBV :</div>
                                              <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.pbv}
                                              onChange={e => setPbv(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">TNBV :</div>
                                              <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.tnbv}
                                              onChange={e => setTnbv(e.target.value)}
                                            />
                                              <div className="font-semibold text-vertblanc">Branch :</div>
                                             <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.branch}
                                              onChange={e => setBranch(e.target.value)}
                                            />
                                            </div>
                                            <button
                                              className=" bg-teal-500 hover:bg-teal-600 text-white rounded px-6 py-2 mt-4  shadow-xl"
                                              onClick={patchProfile}
                                              
                                            >
                                              Enregistrer
                                            </button>
                                          </div>
                                        </div>
                                        {/* End User Profile Two Columns */}

                                         

                               
      
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
                         className='text-5xl font-bold font-wenssep text-green-900'>
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