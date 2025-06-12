import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem
} from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';

const GridKoa = () => {
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
            borderRadius: '20px',
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProduits();
  }, []);

  const handleEditClick = (id) => {
    toast.info(`Modifier le produit avec ID: ${id}`);
    // Tu peux ici ouvrir une modale ou un formulaire d'édition
  };

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

  return (
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
  );
};

export default GridKoa;
