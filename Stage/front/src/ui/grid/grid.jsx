import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, Button, Alert } from '@mui/material';
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Original code unchanged
const gridkoa = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#2F403E'
            },
            background:{
                default: '#BBF2F2'
            },
        },
        components:{
            MuiDataGrid:{
                StyleOverrides: {
                    root :{
                        backgroundColor: '#ffffff',
                        borderRadius: '20px',
                        overflow:'hidden',
                        padding:'10px',
                        border:'none',
                    },
                    columnHeaders: {
                        backgroundColor: '#027333',
                        fontWeight:'bold'
                    }
                }
            }
        }
    })
    const [produits, setProduits] = React.useState([]);
    const [loading, setLoading] = React.useState(true); // Added to fix undefined setLoading
 

    React.useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/produits');
                if (!response.ok) {
                    throw new Error('Failed to fetch produits');
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

        fetchProduits();
    }, []);

    const columns = [
        {
            field: 'Nom',
            headerName: 'Nom',
            flex: 1,
        },
        {
            field: 'Description',
            headerName: 'Description',
            flex: 1,
        },
        {
            field: 'Bv',
            headerName: 'BV',
            flex: 1,
        },
        {
            field: 'Dollard',
            headerName: '$',
            flex: 1,
        },
        {
            field: 'Prix_distributeur',
            headerName: 'Prix Distributeur',
            flex: 1,
        },
        {
            field: 'Prix_en_detail',
            headerName: 'Prix Détail',
            flex: 1,
        }
    ];

    function CustomToolbar(){
        return (
            <GridToolbarContainer>
                <GridToolbarQuickFilter/>
                <GridToolbarExport/>
            </GridToolbarContainer>
        );
    }

    // Form handling
   

   

    return (
        <ThemeProvider theme={theme}>
            <div style={{width: "100%"}}  className='w-full p-2'>
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
                            color ="#425944"
                            fontWeight="5px"
                          />
                
                <DataGrid
                    localeText={{...frFR.components.MuiDataGrid.defaultProps.localeText}}
                    rows={produits}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5, page: 0
                            },
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    slots={{ toolbar: CustomToolbar }}
                    showToolbar
                    disableRowSelectionOnClick
                    disableColumnResize
                    disableColumnSelector
                    isRowSelectable={false}
                />
                
            </div>
        </ThemeProvider>
    );
};

export default gridkoa;