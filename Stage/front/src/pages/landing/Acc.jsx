import { TbMessageChatbot } from "react-icons/tb"; 
import { CgBot } from "react-icons/cg"; 
import { BiLogInCircle } from "react-icons/bi"; 
import { AiFillCloseCircle } from "react-icons/ai"; 
import wosh from '../../assets/img/womanshoping.png'
import { useNavigate } from 'react-router'
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion} from 'framer-motion'
import Navbar from '../../components/SideNav/navbarmodern'
import History from './historique'
import Vente from './vente'

import { useEffect, useState } from "react";
import Chat from "./Chat/chat";
import Message from './message/message';
import Rdv from "./Rdv";









const Landing = () => {
const navigate = useNavigate();
const is_active = localStorage.getItem("is_active");
const token = localStorage.getItem('access_token')
const is_superuser = localStorage.getItem("is_superuser");
const [ustilisateur,setUtilsateur] = useState([])
const [profileU,setProfileU] = useState([])
const [downline,setDownline] = useState([]);
const [loading, setLoading] = useState(true);

 const toogleDark = () =>{
        setDarkMode(!darkMode)

    }

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
         const dresponse = await fetch('http://localhost:8000/downline/' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const ddata = await dresponse.json();
            setDownline(ddata);
            setLoading(false);

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
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.40, // délai entre chaque item
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};


//mise a jours du profile 
const [image,setImage] = useState(null)
const AjoutProfile = async (e) => {
  e.preventDefault();
  if (!image) {
    toast.error("Aucune image sélectionnée !");
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
      toast.success("Photo de profil mise à jour!");
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
      const patchProfile = async (e) => {
        e.preventDefault();
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
              if(token) {
                fetchUtilisateur();
                 fetchuserprofile();

              }
            setTimeout(() => {
              toast.success('vita oooo ')
              closeProfile()
            }, 1000);

          } else {
            toast.error("Erreur lors de la mise à jour du profil");
          }
        } catch (error) {
          toast.error("Erreur technique lors de la mise à jour");
        }
      };



const [Profile,setProfile] = useState(false)
const [message,setmessage] = useState(false)
const [Bot,setBot] = useState(false)
const [varotra,setVarotra] = useState(false)
const [historique,setHistorique] = useState(false)
const [rdv,setRdv] = useState(false)
const openBot = () => setBot(true)
const closeBot = () => setBot(false)
const openProfile = () => setProfile(true)
const closeProfile = () => setProfile(false)
const openmessage = () => setmessage(true)
const closemessage = () => setmessage(false)
const openVarotra = () => setVarotra(true)
const closeVarotra = () => setVarotra(false)
const openhistorique = () => setHistorique(true)
const closehistorique = () => setHistorique(false)
const openRdv = () => setRdv(true)
const closeRdv = () => setRdv(false)

 

 
    return (
            <div className="h-screen  w-full   justify-center items-center bg-gradient-to-tl from-vertblanc  ">
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
                 <Navbar is_active={is_active} is_superuser={is_superuser}  
                          openProfile={openProfile} openBot={openBot} 
                          openmessage={openmessage} 
                          openhistorique={openhistorique}
                          openVarotra={openVarotra}
                          openRdv={openRdv}
                          />
                       
                          {rdv && (
                            <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                      <Rdv closeRdv={closeRdv} />

                            </motion.div>
                          )}  
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
                {/* ventedeproduit */}

                {varotra && (
                    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                       <div className="max-w-4xl w-full">
                        <button className=" flex -mx-3 w-full justify-end " onClick={closeVarotra}><AiFillCloseCircle className=" h-6 w-auto text-red-500" /></button>
                         <Vente />
                       </div>
                       
                        
                    </motion.div>
                )}

                {historique && (
                    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur
                                                 z-50 flex items-center justify-center p-5"

                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                       <div className="max-w-4xl w-full">
                        <button className=" flex -mx-3 w-full justify-end " onClick={closehistorique}><AiFillCloseCircle className=" h-6 w-auto text-red-500" /></button>
                         <History />
                       </div>
                       
                        
                    </motion.div>
                )}
                
                {Profile && (
                    <motion.div 
                        className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-5"
                        initial={{ opacity: 0  }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                            <div className=' max-w-4xl grid  gap-2 w-full rounded  '>
                        
                               
                                <div className='flex p-5 w-full  rounded-md'>
                                        

                                        {/* User Profile Two Columns */}
                                        <div className="w-full flex flex-row gap-8 bg-vertblanc/50 rounded-md">
                                          
                                          {/* Colonne gauche : Mise à jour du profil */}
                                          <div  className="flex-1 rounded-lg p-2 px-3 flex flex-col items-center ">
                                          <button className=' flex self-start' onClick={closeProfile}><AiFillCloseCircle 
                                         className="h-6 w-auto  text-red-500"/></button>
                                            {/* Photo de profil */}
                                            <div className="mb-4 flex flex-col items-center">
                                              <img
                                                src={profileU?.image || `https://ui-avatars.com/api/?name=User`}
                                                alt="Profile"
                                               
                                                className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow"
                                              />
                                            
                                                <div className={`${profileU.confirmed ?  "grid grid-cols-2 gap-2 mt-3":"hidden"}`}>
                                                <input
                                                type="file"
                                                accept="image/*"
                                                 onChange={(e) => setImage(e.target.files[0])}
                                                className=" p-1 rounded text-sm bg-transparent"
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
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Parent : </div>
                                                <div className="text-sm font-semibold text-slate-950">{ustilisateur.directline}</div>
                                                <div className={`text-sm font-semibold font-inter text-vertblanc ${profileU.confirmed ? "hidden" : ""} `}>Status : </div>
                                                <div className={`text-sm font-semibold text-white ${profileU.confirmed ? "hidden" : ""}`}>{profileU.confirmed ? "" : "En attent de confirmation !!!"}</div>
                                                


                                            </div>
                                          
                                            
                                            {/* <button
                                              type="submit"
                                              className="bg-teal-500 hover:bg-teal-600 text-white rounded px-6 py-2 w-full mt-2 shadow"
                                            > 
                                              Mise à jour
                                            </button> */}
                                            {!profileU.confirmed && (
                                              <div className="flex justify-center items-center h-full w-full p-4 text-red-700 font-bold text-xl bg-white/50 rounded m-4">
                                               Votre compte n'est pas encore activé.
                                                <br /> Veuillez patienter jusqu'à la confirmation de l'administrateur.
                                              </div>
                                            )}
                                            {profileU.confirmed && (

                                                 <div className="bg-white/50 h-72 w-full mt-4 rounded p-3 flex flex-col">
                                                     <div className="flex-1 overflow-y-auto scrollbar-none">
                                                        <div className="border border-none rounded m-2 text-vertsombre">Equipe</div>

                                                        {loading ? (
                                                          <div className="text-center text-gray-500">Chargement...</div>
                                                        ) : downline.length === 0 ? (
                                                          <div className="text-center text-gray-500">Aucun membre trouvé.</div>
                                                        ) : (
                                                          <motion.div
                                                            className="flex flex-col space-y-2"
                                                            variants={containerVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                          >
                                                            {downline.map((member) => (
                                                              <motion.div
                                                                key={member.id}
                                                                variants={itemVariants}
                                                                whileHover={{ scale: 1.020 }}
                                                                className="h-10 w-full bg-vertgris p-2 rounded flex justify-between shadow-md hover:shadow-2xl hober-rounded  px-3
                                                                          hover:font-bold hover:bg-white/50 hover:text-slate-800 text-white"
                                                                                                                              >
                                                                <div className="">{member.member_name}</div>
                                                                <div className="text-sm font-bold cursor-pointer">{member.member_code}</div>
                                                              </motion.div>
                                                            ))}
                                                          </motion.div>
                                                        )}
                                                      </div>
                                                    </div>
                                            )}
                                          </div>

                                          {/* Colonne droite : Infos membre */}

                                              {profileU.confirmed && (

                                             <div className="flex-1 rounded-lg p-6 flex flex-col gap-3 ">
                                          
                                            <div className="grid grid-cols-2 gap-2">
                                            
                                              <div className="font-semibold text-vertblanc">Depth :</div>
                                             <input
                                              type="text"
                                              className="w-full p-2 justify-center items-center rounded outline-none foucus:border-none shadow-xl"
                                              placeholder={ustilisateur.depth}
                                              onChange={e => setDepth(e.target.value)}
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
                                              )}
                                       
                                        </div>
                                        {/* End User Profile Two Columns */}

                                         

                               
      
                                </div>

                            </div>
                        
                    </motion.div>
                )}

                                          
                       
                    
                    
                                     </div>

                                     {/* malalaka */}





                                     {/* farany */}

                <section className='h-screen flex justify-center  items-center bg  '>
                   
                    <div className='  h-screen justify-center flex flex-col p-20 m-5 items-start '>
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
                         className='text-5xl font-bold font-wenssep m-3 text-green-900'>
                            SHOP MAHQUAFY ! 
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
                        className='flex w-1/2 mt-3 m-5 font-inter'>
                            Bienvenue {profileU.first_name}! Vous faites déjà partie de l’équipe. Veuillez vous connecter ou créer un compte, puis attendre la confirmation de l’administrateur.
                          En attendant, vous avez déjà accès au chatbot pour poser vos questions ou demander des conseils médicaux.   
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
                            
                              <button onClick={openBot} className='h-12 m-2 bg-vert mt-20 px-10 flex gap-6 justify-center items-center rounded text-white font-bold text-lg shadow-lg hover:bg-gray-400' 
                            >Besoins d'un Conseils  <TbMessageChatbot className="h-6 w-auto"/></button>
                            
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
                            <img src={wosh} alt="" className='block md:h-1/2 lg:h-3/4 m-3 mt-3 ' />
                        </motion.div>
                    </div>
                </section>
                
                
                
                        <div className="m-3 ">

                        </div>

                
            </div>
    )
}

export default Landing