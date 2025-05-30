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
    const [error, setError] = React.useState(null); // Added for form validation
    const [newProduct, setNewProduct] = React.useState({
        Nom: '',
        Description: '',
        Bv: '',
        Dollard: '',
        prix_distributeur: '',
        Prix_en_detail: '',
    });

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
            flex: 2,
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
            field: 'prix_distributeur',
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.Nom || !newProduct.Description) {
            toast.error('Nom et Description sont requis');
            return;
        }
        const newId = produits.length > 0 ? Math.max(...produits.map((p) => p.id)) + 1 : 0;
        setProduits((prev) => [...prev, { ...newProduct, id: newId }]);
        setNewProduct({
            Nom: '',
            Description: '',
            Bv: '',
            Dollard: '',
            prix_distributeur: '',
            Prix_en_detail: '',
        });
        toast.success('Produit Ajoutée');
        setError(null);
    };

    return (
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
                />
                <Box component="form" onSubmit={handleAddProduct} sx={{ mt: 2, display: 'flex', flexWrap: 'nowrap', gap: 1, overflowX: 'auto' }}>
                    <TextField
                        name="Nom"
                        label="Nom"
                        value={newProduct.Nom}
                        onChange={handleInputChange}
                        size="small"
                       
                        sx={{ width: 180, '& .MuiInputBase-root': { backgroundColor: '#BBF2F2' } }}
                    />
                    <TextField
                        name="Description"
                        label="Description"
                        value={newProduct.Description}
                        onChange={handleInputChange}
                        size="small"
                        sx={{ width: 180, '& .MuiInputBase-root': { backgroundColor: '#BBF2F2' } }}
                    />
                    <TextField
                        name="Bv"
                        label="BV"
                        value={newProduct.Bv}
                        onChange={handleInputChange}
                        size="small"
                        sx={{ width: 180, '& .MuiInputBase-root': { backgroundColor: '#BBF2F2' } }}
                    />
                    <TextField
                        name="Dollard"
                        label="$"
                        value={newProduct.Dollard}
                        onChange={handleInputChange}
                        size="small"
                        sx={{ width: 180, '& .MuiInputBase-root': { backgroundColor: '#BBF2F2' } }}
                    />
                    <TextField
                        name="prix_distributeur"
                        label="Prix Distributeur"
                        value={newProduct.prix_distributeur}
                        onChange={handleInputChange}
                        size="small"
                        sx={{ width: 180, '& .MuiInputBase-root': { backgroundColor: '#BBF2F2' } }}
                    />
                    <TextField
                        name="Prix_en_detail"
                        label="Prix Détail"
                        value={newProduct.Prix_en_detail}
                        onChange={handleInputChange}
                        size="small"
                        sx={{ width: 180, '& .MuiInputBase-root': { backgroundColor: '#BBF2F2' } }}
                    />
                    <Button type="submit" variant="contained" color="primary" className='' sx={{ px: 2 }}>
                        Ajouter
                    </Button>
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default gridkoa;