
import { useEffect ,useState ,React} from 'react';
import MUIDataTable from "mui-datatables";
import {createTheme ,ThemeProvider} from '@mui/material/styles'

const Tb = () => {
const columns = [
{
  name :"Nom"
},
{
  name:"Description"
},
{
  name:"Bv"
},
{
  name:"Dollard",
  label :"$"
},
{
  name:"prix_distributeur"
},
{
  name:"Prix_en_detail"
},

];

  const [produit,setProduit] = useState()
     useEffect(() => {
              const fetchproduit  = async () =>{
               
                  const response = await fetch("http://localhost:8000/api/produits/");
                  const data = await response.json();
                  console.log(data);
                  setProduit(data);
                
              };
              fetchproduit();
            },[]);


const options = {
  selectableRows: false,
  elevation : 0,
  rowsPerPage: 5,
  rowsPerPageOptions : [5,10,15,30],

};

const getMuiTheme = () =>
  createTheme({
    typography  :{
      fontFamily:"inter"
    },
    palette :{
      background: {
        paper:"#BBF2F2",
        default: "#BBF2F2"
      },
      mode :'light',
    },
    components :{
      MuiTableCell:{
        styleOverrides :{
          head :{
              padding:"10px 4px "
          },
          body:{
            padding :"7px 15px",

          }
        }
      }
    }

  });


  return (
    <div className='bg-slate-800'>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
            title={"Liste des Produits"}
            data={produit}
            columns={columns}
            options={options}
        />
      </ThemeProvider>
        
     
    </div>
  )
}

export default Tb