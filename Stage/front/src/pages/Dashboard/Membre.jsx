import { AiFillCloseCircle } from "react-icons/ai"; 
import { BsCheckAll } from "react-icons/bs"; 
import { BsPersonAdd } from "react-icons/bs"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useState ,useEffect} from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import {motion} from 'framer-motion'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { frFR } from '@mui/x-data-grid/locales';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('access_token');

const Membre = () => {
    const [darkMode,setDarkMode] = useState(false);
    const [ajoutform,setAjoutform] = useState(false);
    const [promote,setPromote] = useState(false);
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

       const theme = createTheme({
          palette: {
            primary: {
              main: '#2F403E'
            },
            background: {
            },
          },
          components: {
            MuiDataGrid: {
              styleOverrides: {
                root: {
                  backgroundColor: '#ffffff',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  padding: '10px',
                },
                columnHeaders: {
                  backgroundColor: '#027333',
                  fontWeight: 'bold'
                }
              }
            }
          }
        });

    const openajoutform = () => setAjoutform(true);
    const closeajoutform = () => setAjoutform(false);
    const openpromote = () => setPromote(true);
    const closepromote = () => setPromote(false);
      const [profile, setProfile] = useState([]);
      const [loading, setLoading] = useState(true);
    const [direct,setDirect] = useState([])

    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }
    const toogleAdd = () =>{
        setAjout(!ajout)
        toast.success(ajout)
    }


const [utilisateur,setUtilsateur] = useState([])
const fetchUtilisateur = async()=> {
    try {
         const response = await fetch('http://localhost:8000/profiles/user' , {
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
              fetchMembre();
        
                }
                catch {
                    toast.error('erreur')
                }
                toast.success('Nouveau Membre ajoutée')
                setAjoutform(false)
                }
        
    }


const [userparid,setUserparid] = useState([]);
const [curentid,setCurentid] = useState();
    const handleEditClick = async (id) => {
        setCurentid(id)
        openpromote()
        try {
            const response = await fetch(`http://localhost:8000/utilisateur/${id}`,{
              method: 'GET',
              headers : {
                'Authorization' : `Bearer ${token}`
              },
            });
            if (!response.ok){

            }
            const data = await response.json();
            setUserparid(data);
        }
        catch {

        }


        
      };
      const[estAdmin,setEstAdmin] = useState()
      const[estEmploye,setEstEmploye] = useState()
      const[newposte,setNewPoste] = useState('')
    

const adminch = (e) =>{
  e.preventDefault()
  setEstAdmin(e.target.checked)
}
const employech = (e) =>{
  e.preventDefault()

  setEstEmploye(e.target.checked)
}
const Promuvoir = async (e) => {
  e.preventDefault()

if(!newposte) {
  toast.error('Poste ne doit pas être vide')
}
  const data = {
    is_superuser : estAdmin,
    is_staff : estEmploye,
    poste : newposte ,
}

  try {
        const response = await fetch(`http://localhost:8000/utilisateur/${curentid}/`,{
              method: 'PATCH',
              headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            });
            if(response.ok){
              toast.success("Migration Success")
              fetchMembre()
              setTimeout(() => {
              closepromote()
            }, 1000);

            }
  }
  catch {

  }
}



    const handleDeleteClick = async (id) => {
       
        try {
          const response = await fetch(`http://localhost:8000/profiles/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error(`Erreur suppression (${response.status})`);
          }
    
          toast.success("Utilisateur supprimé avec succès");
          fetchMembre();
          setProfile((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
          toast.error("Échec de la suppression !");
          console.error("Erreur suppression :", error);
        }
      };
    
 useEffect(() => {
     fetchMembre();
  }, []);
    
    const token = localStorage.getItem('access_token');

    if (!token) {
      toast.error('Aucun token trouvé. Veuillez vous connecter.');
      setLoading(false);
      return;
    }

    const fetchMembre = async () => {
      try {
        const response = await fetch('http://localhost:8000/profiles/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur (${response.status})`);
        }

        const data = await response.json();
     
        const formattedData = Array.isArray(data)
          ? data.map((item, index) => ({
              ...item,
              id: item.id || index,
            }))
          : [{ ...data, id: data.id || 0 }];

        setProfile(formattedData);
      } catch (error) {
        console.error('Erreur API:', error);
        toast.error('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

   

     const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
const columns = [
  { field: 'member_code', headerName: 'Member Code', flex: 1 },
  { field: 'member_name', headerName: 'Member Name', flex: 1 },
  { field: 'depth', headerName: 'Depth', flex: 1 },
  { field: 'directline', headerName: 'Directline', flex: 1 },
  { field: 'sponsor', headerName: 'Sponsor', flex: 1 },
  { field: 'registration_date', headerName: 'Registration Date', flex: 1 },
  { field: 'grade', headerName: 'Grade', flex: 1 },
  { field: 'gbv', headerName: 'Gbv', flex: 1 },
  { field: 'cpbv', headerName: 'Cpbv', flex: 1 },
  { field: 'cnbv', headerName: 'Cnbv', flex: 1 },
  { field: 'pbv', headerName: 'Pbv', flex: 1 },
  { field: 'tnbv', headerName: 'Tnbv', flex: 1 },
  { field: 'branch', headerName: 'Branch', flex: 1 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    getActions: (params) => [
      ...(utilisateur?.is_superuser
        ? [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Modifier"
              onClick={() => handleEditClick(params.id)}
            />
          ]
        : []),
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Supprimer"
        onClick={() => handleDeleteClick(params.id)}
      />
    ]
  }
];


  
    return (
      
       <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}
       {/* contenue */}
            <div className=" m-3 text-xl   font-semibold  w-full rounded-sm bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
             
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
                              <ThemeProvider theme={theme}>
                                  <div style={{ width: '100%' }} className='py-2'>
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
                            
                                    <DataGrid
                                      localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                                      rows={profile}
                                      columns={columns}
                                      loading={loading}
                                      initialState={{
                                        pagination: {
                                          paginationModel: {
                                            pageSize: 10,
                                            page: 0,
                                          },
                                        },
                                      }}
                                      pageSizeOptions={[10, 20, 50]}
                                      disableRowSelectionOnClick
                                      disableColumnResize
                                      disableColumnSelector
                                      showToolbar
                                      slots={{ toolbar: CustomToolbar }}
                                    />
                                  </div>
                                </ThemeProvider>
                        </div>
                         
                        
               
              </div>
              {promote && (
                <motion.div
                      className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4" 
                     initial={{opacity:0}}
                     animate={{opacity:1}}
                     exit={{opacity:0}}
                     transition={{duration:0.5}}
                     >
                      <div className="bg-teal-800/20 backdrop-blur-xl rounded-xl shadow-wl w-full max-w-md p-6">
                          <button onClick={closepromote} className="flex justify-end w-full"><AiFillCloseCircle className="h-6 w-auto text-red-500"/></button>
                           <div className="mb-4 flex flex-col items-center">
                                      <img
                                        src={`http://localhost:8000/${userparid?.image}` || `https://ui-avatars.com/api/?name=${userparid.username}`}
                                        alt="Profile"
                                               
                                        className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow"
                                       />
                                              
                            </div>
                             <div className="grid grid-cols-2 w-full mt-3 border p-5 border-dashed rounded">
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Nom : </div>
                                                <div className="text-sm font-semibold font-inter text-white/80">{userparid.first_name}</div>
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Prenom : </div>
                                                <div className="text-sm font-semibold font-inter text-white/80">{userparid.last_name}</div>
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Email : </div>
                                                <div className="text-sm font-semibold font-inter text-white/80">{userparid.email}</div>
                                                <div className="text-sm font-semibold font-inter text-vertblanc">Poste : </div>
                                                <div className="text-sm font-semibold font-inter text-white/80 uppercase ">{userparid.poste || "Membre"}</div>

                              </div>
                          <div className="grid grid-cols-1  gap-2 my-10">
                            <div className="flex justify-between items-end mx-1">
                              <label htmlFor="Poste" className="font-dexery text-vertblanc"> Poste :</label>
                            <input type="text" 
                                   className=" h-10 p-3  focus:outline-none text-vertblanc focus:text-white focus:border
                                                           bg-transparent border-b border-b-white focus:rounded transition-opacity duration-300
                                                           "  
                                    placeholder={userparid.poste}
                                    onChange={e => setNewPoste(e.target.value)}/>
                            </div>
                            <div className="grid grid-cols-1 gap-2 w-full my-5 m-1">
                            <div className="flex flex-row justify-between items-center ">
                                <label className="text-md font-dexery text-vertblanc">Administrateur</label>
                                <input type="checkbox" name="" id="" className="h-5 w-5" checked={estAdmin} onChange={adminch} />
                            </div>
                            <div className="flex flex-row justify-between items-center ">
                                <label className="font-dexery  text-vertblanc">Employé</label>
                                <input type="checkbox" name="" id="" className="h-5 w-5" checked={estEmploye} onChange={employech}/>
                            </div>
                             
                            </div>
                            <button className="bg-teal-100 rounded h-10  mt-10 text-vertsombre shadow-xl hover:bg-teal-400 hover:text-white " onClick={Promuvoir}>Promouvoir</button>
                          </div>
                      </div>

                </motion.div>
              )}

              {ajoutform && (
                <motion.div 
                     className="fixed inset-0 bg-black/80 backdrop-blur-sm
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