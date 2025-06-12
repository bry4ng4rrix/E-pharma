import { useState, useEffect } from 'react';
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
import { toast, ToastContainer, Bounce } from 'react-toastify';
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

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      toast.error('Aucun token trouvé. Veuillez vous connecter.');
      setLoading(false);
      return;
    }

    const fetchProduits = async () => {
      try {
        const response = await fetch('http://localhost:8000/profiles', {
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

    fetchProduits();
  }, []);

  const handleEditClick = (id) => {
    toast.info(`Modifier l'utilisateur avec ID: ${id}`);
    // Tu peux ici ouvrir une modale ou activer un formulaire inline
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem('access_token');
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
      setProfile((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Échec de la suppression !");
      console.error("Erreur suppression :", error);
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
    }
  ];

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
  );
};

export default GridKoa;
