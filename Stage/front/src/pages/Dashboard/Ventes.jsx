import Sidebar from "../../components/SideNav/Sidebard";
import { useState, useEffect } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem
} from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Vente = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [ventes, setVentes] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

  const toogleDark = () => {
        setDarkMode(!darkMode);
    };

const handleEditClick = (id) =>{

    toast.success(id)
}

    const theme = createTheme({
              palette: {
                primary: {
                  main: '#2F403E'
                },
                background: {
                  default: '#BBF2F2'
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
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'produit', headerName: 'Produit', flex: 1 },
    { field: 'quantite', headerName: 'Nombre', flex: 1 },
    { field: 'prixtotale', headerName: 'Prix', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Detailles',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AssignmentIcon />}
          label="Modifier"
          onClick={() => handleEditClick(params.id)}
        />,],}];
    useEffect(() => {
        fetchVentes();
  },[]);
    const fetchVentes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/facture/');
            const data = await response.json();
            setVentes(data);
            const totalVentes = data.length;
            const totalMontant = data.reduce((sum, vente) => sum + vente.prixtotale, 0);
            const ventesParProduit = data.reduce((acc, vente) => {
                acc[vente.produit_nom] = (acc[vente.produit_nom] || 0) + vente.quantite;
                return acc;
            }, {});

            setStats({
                totalVentes,
                totalMontant,
                ventesParProduit
            });
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des ventes:', error);
            setLoading(false);
        }
    };

  
    return (
        <section className={` ${darkMode && 'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>
            <Sidebar />
            
            <div className="m-3 text-xl font-semibold w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
                <Fixednav toogleDark={toogleDark} darkMode={darkMode} />

                <div className="flex flex-col flex-1 p-4">
                   

                    <div className="flex flex-1 gap-4">
                        {/* Tableau des ventes (2/3) */}
                        <div className="flex-1 w-2/3">

                                {/* Filtre par date */}
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
                                      rows={ventes}
                                      columns={columns}
                                      loading={loading}
                                      initialState={{
                                        pagination: {
                                          paginationModel: {
                                            pageSize: 5,
                                            page: 0,
                                          },
                                        },
                                      }}
                                      pageSizeOptions={[5,10, 20, 50]}
                                      disableRowSelectionOnClick
                                      disableColumnResize
                                      disableColumnSelector
                                      showToolbar
                                      slots={{ toolbar: CustomToolbar }}
                                    />
                                  </div>
                                </ThemeProvider>

                             
                            
                        </div>

                        {/* Statistiques (1/3) */}
                        <div className="w-1/3  mt-2  ">
                            <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
                              

                                <div className="space-y-4">
                                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
                                        <h3 className="font-semibold">Total des ventes</h3>
                                        <p className="text-2xl">{stats.totalVentes}</p>
                                    </div>

                                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
                                        <h3 className="font-semibold">Montant total</h3>
                                        <p className="text-2xl">{stats.totalMontant} Ariary</p>
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vente;