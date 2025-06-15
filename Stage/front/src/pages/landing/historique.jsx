import { AiFillCloseCircle } from "react-icons/ai"; 
import { useState, useEffect } from "react";

import { motion } from 'framer-motion'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/SideNav/navbarmodern'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem
} from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const historique = () => {
        const [loading, setLoading] = useState(true);
        const [detail,setdetail] = useState(false);
        const openDetail = () => setdetail(true)
        const closeDetail = () => setdetail(false)
        const [currentId,setCurrentId] = useState('')
        const [utilisateur,setUtilsateur] = useState([])
        const [Produit,setProduit] = useState([])
        const token = localStorage.getItem('access_token')
        const [vente,setVente] = useState(0)


    
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
fetchVente();
}
},[])

const fetchVente = async () => {
          try {
            const response = await fetch('http://localhost:8000/mesvente/',{
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
              throw new Error('Erreur serveur');
            }
            const data = await response.json();
            const formattedData = data.map((item, index) => ({
              ...item,
              id: item.id || index,
            }));
            setVente(formattedData);
            setLoading(false);
          } catch (error) {
            toast.error('Erreur lors du chargement des produits');
            setLoading(false);
          }
        };





  const theme = createTheme({
        palette: {
          primary: {
            main: '#2F403E'
          },
          background: {
            default: '#BBF2F2',
          },
        },
        components: {
          MuiDataGrid: {
            styleOverrides: {
              root: {
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                overflow: 'hidden',
                padding: '10px',
                border: 'none',
              },
              columnHeaders: {
                backgroundColor: '#027333',
                fontWeight: 'bold'
              }
            }
          }
        }
      });
      
       const CustomToolbar = () => (
        <GridToolbarContainer>
          <GridToolbarQuickFilter />
          <GridToolbarExport />
        </GridToolbarContainer>
      );
    const columns = [
        { field: 'produit', headerName: 'Nom du Produit', flex: 2 },
        { field: 'date', headerName: 'Date', flex: 2 },
        { field: 'quantite', headerName: 'Nombre', flex: 1 },
        { field: 'prixtotale', headerName: 'Prix Totale', flex: 1 },
      
      ];
      

  return (
    <div className='h-screen  w-full   justify-center items-center bg-green-200 '>
        <div className='h-16 fixed top-0 left-0 right-0 justify-between items-center p-5 gap-6 '>
            <Navbar/>

<div>
    {detail && (
        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4"

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-full  max-w-xl bg-white/50 p-6 rounded">
                                <button  className="flex justify-end" onClick={closeDetail}><AiFillCloseCircle className="text-red-500"/></button>
                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                      
                                    </div>
                                    <button className="bg-green-400 w-full mt-5 h-10 items-center justify-center text-white rounded" onClick={EffectuerVente}>Effectuer le vente</button>
                            </div>

        </motion.div>
    )}
     <ThemeProvider theme={theme}>
                              <div style={{ width: "100%" }} className='w-full p-2'>
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
                                  rows={vente}
                                  columns={columns}
                                  loading={loading}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                        page: 0
                                      },
                                    }
                                  }}
                                  pageSizeOptions={[5, 10]}
                                  slots={{ toolbar: CustomToolbar }}
                                  showToolbar
                                  disableRowSelectionOnClick
                                  disableColumnResize
                                  disableColumnSelector
                                  isRowSelectable={() => false}
                                />
                              </div>
                            </ThemeProvider>
    
</div>
        </div>
        <div>
            
        </div>

    </div>
  )
}

export default historique