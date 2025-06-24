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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const vente = () => {
        const [loading, setLoading] = useState(true);
        const [vendreproduit,setVendreproduit] = useState(false);
        const openvente = () => setVendreproduit(true)
        const closevente = () => setVendreproduit(false)
        const [currentId,setCurrentId] = useState('')
        const [utilisateur,setUtilsateur] = useState([])
        const [profile,setProfile] = useState([])
        const [Produit,setProduit] = useState([])
        const token = localStorage.getItem('access_token')
        const [Pnombre,setPnombre] = useState(0)


    
    
 
    
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

            const presponse = await fetch('http://localhost:8000/profiles/update/' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const pdata = await presponse.json();
            setProfile(pdata);

    }
    catch {
        
    }
}
useEffect(() => {
if(token){

fetchUtilisateur();
}
},[])


    const vendre = async (id) => {
        setCurrentId(id)
       
          openvente()
       
            const response = await fetch(`http://localhost:8000/api/produits/${id}/`);
            const data = await response.json();
             setProduit(data);

            
            
              console.log('gbv user',profile.gbv)
              console.log('bv produit',Produit.Bv)

            

     

    };
const produittotale = Produit.Prix_distributeur * Pnombre 
const Bvup = Produit.Bv * Pnombre 
const EffectuerVente = async (e) => {
    e.preventDefault();
console.log(utilisateur.Nom)
    const facturedata = {
        vendeur : profile.id,
        produit : Produit.Nom,
        quantite : Pnombre,
        prixtotale : produittotale,
    }
    toast.dismiss()

    try {
        const response = await fetch(`http://localhost:8000/api/facture/`, {
             method: 'POST',
             headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturedata),
      });

      toast.success('Vente success')
      setTimeout(() => {
        closevente()
        fetchProduits()
      }, 1000);
    }catch {

    }
const NewGbv = profile.gbv + (Produit.Bv * Pnombre)
const data = {
  gbv : NewGbv,
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

    }catch {

    }
} 


  const theme = createTheme({
        palette: {
          primary: {
            main: '#2F403E'
          },
          background: {
            default: '#00000',
            border :'#ffffff',
            fontWeight:'bold'
            
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
       const [produits, setProduits] = useState([]);
       const fetchProduits = async () => {
          try {
            const response = await fetch('http://localhost:8000/api/produits');
            if (!response.ok) {
              throw new Error('Erreur serveur');
            }
            const data = await response.json();
            const formattedData = data.map((item, index) => ({
              ...item,
              id: item.id || index,
            }));
            setProduits(formattedData);
            setLoading(false);
          } catch (error) {
            toast.error('Erreur lors du chargement des produits');
            setLoading(false);
          }
        };
         useEffect(() => {
               
           
                fetchProduits();
           
                
              }, []);
       const CustomToolbar = () => (
        <GridToolbarContainer>
          <GridToolbarQuickFilter />
          <GridToolbarExport />
        </GridToolbarContainer>
      );
    const columns = [
        { field: 'Nom', headerName: 'Nom', flex: 1 },
        { field: 'Description', headerName: 'Description', flex: 1 },
        { field: 'Bv', headerName: 'BV', flex: 1 },
        { field: 'Dollard', headerName: '$', flex: 1 },
        { field: 'Prix_distributeur', headerName: 'Prix Distributeur', flex: 1 },
        { field: 'Prix_en_detail', headerName: 'Prix Détail', flex: 1 },
        { field: 'Nombre', headerName: 'Nombre  ', flex: 1 },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Vendre',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<ShoppingCartIcon />}
              label="Modifier"
              onClick={() => vendre(params.id)}
            />,
            
          ],
        },
      ];
      

  return (
  
<div>
    {vendreproduit && (
        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4"

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-full  max-w-xl bg-white/50 p-6 rounded">
                                <button  className="flex justify-end" onClick={closevente}><AiFillCloseCircle className="text-red-500"/></button>
                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                        <div className="font-bold text-vertsombre">Nom : </div>
                                        <div className="font-semibold ">{utilisateur.first_name} {utilisateur.last_name}</div>
                                        <div className="font-bold text-vertsombre">Produit :</div>
                                        <div className="font-semibold ">{Produit.Nom}</div>
                                        <div className="font-bold text-vertsombre"> Bv : </div>
                                        <div className="font-semibold ">{Bvup}</div>
                                        <div className="font-bold text-vertsombre">Quantite</div>
                                        <input type="number" placeholder={Produit.Nombre}  onChange={(e) => setPnombre(e.target.value)}
                                                className="h-10 p-3 lowercase justify-center items-center font-semibold rounded focus:border-none focus:outline-none"/>
                                        <div className="font-bold text-vertsombre">Prix totale</div>
                                        <div className="font-semibold ">{produittotale} Ar</div>
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
                                  rows={produits}
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
       
  )
}

export default vente