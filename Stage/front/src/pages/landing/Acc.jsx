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

const Landing = () => {
const navigate = useNavigate();
const is_active = localStorage.getItem("is_active");
const token = localStorage.getItem('access_token')
const is_superuser = localStorage.getItem("is_superuser");
const email_act = localStorage.getItem('email');
const member_code = localStorage.getItem('member_code');
const username = localStorage.getItem('username');
const [ustilisateur,setUtilsateur] = useState([])

console.log(member_code);
console.log(username);

console.log(email_act);

const fetchUtilisateur = async()=> {
    try {
         const response = await fetch('http://localhost:8000/api/user' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setUtilsateur(data);
            console.log(ustilisateur)

    }
    catch {
        
    }
}
useEffect(() => {

fetchUtilisateur();
},[])


// momban le message kely mafinaritra
const [Profile,setProfile] = useState(false)
const [Bot,setBot] = useState(false)
const [Imc,setImc] = useState(false)
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
      // State pour stocker les données du profil
      const [profileData, setProfileData] = useState({});

      // Récupérer le profil utilisateur par code et email
      const fetchProfileByCodeAndEmail = async () => {
        try {
          // Utilisation de POST (plus sécurisé pour ce type de recherche)
          const response = await fetch('http://localhost:8000/profiles/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              member_code: member_code,
              email: email_act,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          } else {
            toast.error("Profil non trouvé ou accès refusé");
          }
        } catch (error) {
          toast.error("Erreur lors de la récupération du profil");
        }
      };

      // PATCH pour mettre à jour le profil
      const patchProfile = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/api/profiles/update/', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              member_code: member_code,
              email: email_act,
              member_name: Member_name || profileData.member_name,
              registration_date: Reg_Date || profileData.registration_date,
              depth: Depth || profileData.depth,
              directline: Directline || profileData.directline,
              sponsor: Sponsor || profileData.sponsor,
              grade: Grade || profileData.grade,
              gbv: Gbv || profileData.gbv,
              cpbv: Cpbv || profileData.cpbv,
              cnbv: Cnbv || profileData.cnbv,
              pbv: Pbv || profileData.pbv,
              tnbv: Tnbv || profileData.tnbv,
              branch: Branch || profileData.branch,
              // ajoute les autres champs si besoin
            }),
          });
          if (response.ok) {
            toast.success("Profil mis à jour !");
            fetchProfileByCodeAndEmail(); // rafraîchir les données
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
                            <div className=' max-w-4xl grid  gap-2 w-full rounded p-5 h-3/4'>
                        
                               
                                <div className='flex p-5 bg-fonddark/50 w-full  rounded-md'>
                                        <button className=' flex justify-items-end' onClick={closeProfile}><AiFillCloseCircle 
                                         className="h-6 w-auto text-red-600"/></button>

                                        {/* User Profile Two Columns */}
                                        <div className="w-full flex flex-row gap-8">
                                          {/* Colonne gauche : Mise à jour du profil */}
                                          <form onSubmit={patchProfile} className="flex-1 bg-white/50 rounded-lg p-6 flex flex-col items-center shadow-md">
                                            {/* Photo de profil */}
                                            <div className="mb-4 flex flex-col items-center">
                                              <img
                                                src={profileData?.profile_picture || 'https://ui-avatars.com/api/?name=User'}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow"
                                              />
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="mt-2 text-xs"
                                              />
                                            </div>
                                            <input
                                              type="text"
                                              className="input input-bordered mb-2 w-full"
                                              placeholder="Nom"
                                              onChange={e => setNom(e.target.value)}
                                            />
                                            <input
                                              type="text"
                                              className="input input-bordered mb-2 w-full"
                                              placeholder="Prénom"
                                              onChange={e => setPrenom(e.target.value)}
                                            />
                                            <input
                                              type="email"
                                              className="input input-bordered mb-2 w-full"
                                              placeholder="Email"
                                              value={email_act || ''}
                                              onChange={e => setEmailAct(e.target.value)}
                                            />
                                            <input
                                              type="text"
                                              className="input input-bordered mb-4 w-full"
                                              placeholder="Member Code"
                                              value={member_code || ''}
                                              onChange={e => setMemberCode(e.target.value)}
                                            />
                                            <button
                                              type="submit"
                                              className="bg-teal-500 hover:bg-teal-600 text-white rounded px-6 py-2 mt-2 shadow"
                                            >
                                              Mise à jour
                                            </button>
                                          </form>
                                          {/* Colonne droite : Infos membre */}
                                          <div className="flex-1 bg-white/80 rounded-lg p-6 flex flex-col gap-3 shadow-md">
                                            <div className="grid grid-cols-2 gap-2">
                                              <div className="font-semibold">Nom membre :</div>
                                              <div>{profileData?.member_name || '-'}</div>
                                              <div className="font-semibold">Depth :</div>
                                              <div>{profileData?.depth || '-'}</div>
                                              <div className="font-semibold">Directline :</div>
                                              <div>{profileData?.directline || '-'}</div>
                                              <div className="font-semibold">Sponsor :</div>
                                              <div>{profileData?.sponsor || '-'}</div>
                                              <div className="font-semibold">Grade :</div>
                                              <div>{profileData?.grade || '-'}</div>
                                              <div className="font-semibold">GBV :</div>
                                              <div>{profileData?.gbv || '-'}</div>
                                              <div className="font-semibold">CPBV :</div>
                                              <div>{profileData?.cpbv || '-'}</div>
                                              <div className="font-semibold">CNBV :</div>
                                              <div>{profileData?.cnbv || '-'}</div>
                                              <div className="font-semibold">PBV :</div>
                                              <div>{profileData?.pbv || '-'}</div>
                                              <div className="font-semibold">TNBV :</div>
                                              <div>{profileData?.tnbv || '-'}</div>
                                              <div className="font-semibold">Branch :</div>
                                              <div>{profileData?.branch || '-'}</div>
                                            </div>
                                            <button
                                              className="self-end bg-teal-500 hover:bg-teal-600 text-white rounded px-6 py-2 mt-4 shadow"
                                              
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