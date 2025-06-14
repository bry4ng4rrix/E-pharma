import { AiFillCloseCircle } from "react-icons/ai";
import Sidebar from "../../components/SideNav/Sidebard";
import { useState, useEffect } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import Dgrid from '../../ui/grid/grid'
import { motion } from 'framer-motion'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import DeleteIcon from '@mui/icons-material/Delete';


const Produits = () => {
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
    
      const [produits, setProduits] = useState([]);
      const [update,setUpdate] = useState([]);
      const [loading, setLoading] = useState(true);

  const [currentId, setCurrentId] = useState(null);
   
    
      useEffect(() => {
       
    
        fetchProduits();
      }, []);
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
    
    const handleEditClick = async (id) => {
        setCurrentId(id);
        setUpdateform(true)
       
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/produits/${id}/`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const data = await response.json();
        setUpdate(data);
      } catch (error) {
        console.error(error);
      }
    };
fetchProduct();
  
      };
        const SaveUpdate = async (e) => {
        e.preventDefault();
         const datau = {
        Nom: Nom || update.Nom,
        Description: Description || update.Description,
        Bv: Bv || update.Bv,
        Dollard: Dollard || update.Dollard,
        Prix_distributeur: Prix_distributeur || update.Prix_distributeur,
        Prix_en_detail: Prix_en_detail || update.Prix_en_detail,
        Nombre : Nombre || update.Nombre,
    }
    console.log(datau)

        toast.dismiss()
        
        try {
            const response = await fetch(`http://localhost:8000/api/produits/${currentId}/`, {
             method: 'PATCH',
             headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datau),
      });
      if(!response.ok) throw new Error ("Erreur d'enregistrement")
        const updatedata = await response.json();
   
     fetchProduits();
        toast.success('Mise a jour success')
        setTimeout(() => {
            closeupdate()
        }, 1000);
       

        }catch(error) {

        }
    }

    
      const handleDeleteClick = async (id) => {
        try {
          const response = await fetch(`http://localhost:8000/api/produits/${id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Erreur de suppression');
          }
    
          toast.success("Produit supprimé avec succès");
          fetchProduits();
          setProduits((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
          toast.error("Échec de la suppression !");
          console.error(error);
        }
      };
    
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
          headerName: 'Actions',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Modifier"
              onClick={() => handleEditClick(params.id)}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Supprimer"
              onClick={() => handleDeleteClick(params.id)}
            />
          ],
        },
      ];
    

    const [ajoutform, setAjoutform] = useState(false);
    const [updateform,setUpdateform] = useState(false);
    const openupdate = () => setUpdateform(true)
    const closeupdate = () => setUpdateform(false)
    const openajoutform = () => setAjoutform(true);
    const closeajoutform = () => setAjoutform(false);
    const [darkMode, setDarkMode] = useState(false);
    const [Nom, setNom] = useState('');
    const [Description, setDescription] = useState('');
    const [Bv, setBv] = useState('');
    const [Dollard, setDollard] = useState('');
    const [Prix_distributeur, setPrix_distributeur] = useState('');
    const [Prix_en_detail, setPrix_en_detail] = useState('');
    const [Nombre, setNombre] = useState('');

    const toogleDark = () => {
        setDarkMode(!darkMode)


    }

    const data = {
        Nom: Nom,
        Description: Description,
        Bv: Bv,
        Dollard: Dollard,
        Prix_distributeur: Prix_distributeur,
        Prix_en_detail: Prix_en_detail,
        Nombre: Nombre
    }

   

    const enregistre = async (e) => {
        e.preventDefault();
        toast.dismiss()
        if (!Nom || !Description || !Bv || !Dollard || !Prix_distributeur || !Prix_en_detail || !Nombre) {
            toast.error('Veuiller remplire tous les Champs')
            return;
        }


        try {
            const response = await fetch("http://localhost:8000/api/produits/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const responsData = await response.json();
            if (response.ok) {
                toast.dismiss()
                fetchProduits();
                toast.success('Produit ajoute avec success')
                setTimeout(() => {
                    
                setAjoutform(false)
                }, 1000);
                
               
                return
            }
            else {
                if (response.status === 400) {
                    Object.entries(responsData).forEach(([field, errors]) => {
                        if (Array.isArray(errors)) {

                            if (field === 'Nom') {
                                toast.error('Nom deja prise')
                            }

                        }
                    })
                }
            }
            return
        }
        catch (error) {
            toast.error('Erreur de connexion au serveur')
        }
    }



    return (

        <section className={` ${darkMode && 'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

           


            {/* sidebard */}
            <Sidebar />

            {/* navbar */}
            {/* contenue */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">

                <Fixednav toogleDark={toogleDark} darkMode={darkMode} />

                <div className="p-3">
                    <div className="justify-end flex m-3">
                        <button className="bg-vert px-5 rounded text-vertblanc p-2" onClick={openajoutform}>Ajouter </button>
                    </div>
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

                    {updateform && (
                        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4"

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-green-50 max-w-md w-full p-6 rounded ">
                                <div className="flex justify-between  m-1  ">
                                    <div className="text-xl text-vertsombre font-semibold">Nouveau Produit</div>
                                    <button onClick={closeupdate}><AiFillCloseCircle /></button>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-10">
                                  <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                                    <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm shadow-xl border-none outline-none" placeholder={update.Nom} onChange={(e) => setNom(e.target.value)} />
                                    <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm shadow-xl border-none outline-none" placeholder={update.Nombre} onChange={(e) => setNombre(e.target.value)} />
                                  </div>
                                    <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder={update.Description} onChange={(e) => setDescription(e.target.value)} />
                                    <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                                        <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder={update.Bv} onChange={(e) => setBv(e.target.value)} />
                                        <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder={update.Dollard} onChange={(e) => setDollard(e.target.value)} />

                                    </div>
                                    <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder={update.Prix_distributeur} onChange={(e) => setPrix_distributeur(e.target.value)} />
                                    <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder={update.Prix_en_detail} onChange={(e) => setPrix_en_detail(e.target.value)} />
                                    <button className="bg-vert h-10 mt-7 mb-4 rounded-sm hover:bg-vertsombre hover:shadow-2xl  shadow-xl  text-green-100" onClick={SaveUpdate}>Update</button>

                                </div>
                            </div>

                        </motion.div>
                    )}

                    {ajoutform && (
                        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4"

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-green-50 max-w-md w-full p-6 rounded ">
                                <div className="flex justify-between  m-1  ">
                                    <div className="text-xl text-vertsombre font-semibold">Nouveau Produit</div>
                                    <button onClick={closeajoutform}><AiFillCloseCircle /></button>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-10">
                                      <div className="grid grid-cols-2 gap-2 mt-2">

                                         <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm shadow-xl border-none outline-none" placeholder="Nom" onChange={(e) => setNom(e.target.value)} />
                                         <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm shadow-xl border-none outline-none" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                                      </div>
                                    <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Descriptions" onChange={(e) => setDescription(e.target.value)} />
                                    <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                                        <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Bv" onChange={(e) => setBv(e.target.value)} />
                                        <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="$" onChange={(e) => setDollard(e.target.value)} />

                                    </div>
                                    <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Prix Distributeur" onChange={(e) => setPrix_distributeur(e.target.value)} />
                                    <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Prix en détail" onChange={(e) => setPrix_en_detail(e.target.value)} />
                                    <button className="bg-vert h-10 mt-7 mb-4 rounded-sm hover:bg-vertsombre hover:shadow-2xl  shadow-xl  text-green-100" onClick={enregistre}>Enregistre</button>

                                </div>
                            </div>

                        </motion.div>
                    )}


                </div>
            </div>



        </section>
    )
}

export default Produits 