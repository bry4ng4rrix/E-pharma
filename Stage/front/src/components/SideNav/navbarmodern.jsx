import { HiOutlineLogout } from "react-icons/hi"; 
import { BsFillMoonFill } from "react-icons/bs"; 
import { CgProfile } from "react-icons/cg"; 
import logo from '../../assets/img/logo.png'
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";


const navbarmodern = ({openProfile,openBot,openmessage,openhistorique,openVarotra,openRdv}) => {

const navigate = useNavigate();
const [utilisateur,setUtilsateur] = useState([])
const token = localStorage.getItem('access_token')

const handleLogout = async () => {
        try {
                  const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await fetch('http://localhost:8000/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
            }
            localStorage.setItem('message','Deconnection Success');
        } catch (error) {
            console.error('Logout error:', error);
        }

        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem('is_active');
        navigate('/');
        // Show success toast and redirect to login page
        
    };
     const toogleDark = () =>{
        setDarkMode(!darkMode)

    }

 

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

  
  return (
    <div className=' flex h-16   p-1 items-center  justify-between w-full   duration-300 translation-all '>
<img src={logo} alt="logo" className='h-16 m-6' />
        <div className=''>
          
            
            
                <ul className=' hidden sm:flex gap-10 cursor-pointer   font-bold    font-wenssep texy-center  text-green-950 transition-all duration-300 '>
                  
                    <button onClick={openmessage} className={`${!utilisateur.confirmed ? "hidden":""} `}>Message</button>
                    <button onClick={openVarotra} className={`${!utilisateur.confirmed ? "hidden":""} `}>Produits</button>
                    <button onClick={openhistorique} className={`${!utilisateur.confirmed ? "hidden":""} `}>Historique</button>
                    <button onClick={openRdv} className={`${utilisateur.is_active ? "":"hidden"} `}>Rendez-vous</button>
                    <button onClick={openProfile} className={`${utilisateur.is_active ? "":"hidden"} `}>Profile</button>
                    <Link to='/admin' className={`  ${utilisateur.is_superuser ? "block" : "hidden"}`}>Administrateur</Link>
                </ul>
            
        </div>
        <div className='h-12 gap-4 rounded-md   items-center text-white justify-center flex '> 
            <div className='justify-center items-center   rounded-full px-3 flex gap-3   '>
                <Link to={`${utilisateur.is_active ? ``:"/login"}`} className=" flex gap-3 text-vertsombre  p-3 "><CgProfile className={`h-6 w-auto text-vertsombre `}/></Link>
                
                <button onClick={handleLogout}>
                <HiOutlineLogout className={`h-6 w-auto text-vertsombre ${utilisateur.is_active ? 'block':'hidden'}`}  /></button>
                </div> 
        </div>

    </div>
  )
}

export default navbarmodern 