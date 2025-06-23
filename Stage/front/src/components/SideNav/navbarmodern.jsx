import { HiOutlineLogout } from "react-icons/hi"; 
import { BsFillMoonFill } from "react-icons/bs"; 
import { CgProfile } from "react-icons/cg"; 
import logo from '../../assets/img/logo.png'
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";


const navbarmodern = ({openProfile,openBot,openmessage}) => {

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
    <div className=' flex  h-16  m-2 p-3 items-center rounded justify-between '>
<img src={logo} alt="logo" className='h-16 m-6' />
        <div className='flex gap-6'>
          
            
            
                <ul className=' hidden md:flex gap-10 cursor-pointer text-md  font-bold    font-wenssep texy-center text-green-950 transition-all duration-300 '>
                  
                    <Link to="/">Acceuille</Link>
                    <Link to="/">A propos</Link>
                    <button className={`${utilisateur.is_active ? "block":"hidden"} `} onClick={openBot}>Bot</button>
                    <button onClick={openmessage} className={`${utilisateur.is_active ? "block":"hidden"} `}>Message</button>
                    <Link to="/vente" className={`${utilisateur.is_active ? "block":"hidden"} `}>Produits</Link>
                 
                    <Link to="/historique" className={`${utilisateur.is_active ? "block":"hidden"} `}>Historique</Link>
                    <button onClick={openProfile} className={`${utilisateur.is_active ? "block":"hidden"} `}>Profile</button>
                    <Link to='/admin' className={`${utilisateur.is_superuser ? "block" : "hidden"}`}>Tableau de bord</Link>
                </ul>
            
        </div>
        <div className='h-12 gap-4 rounded-md  p-5  items-center text-white justify-center flex '> 
            <div className='rounded-lg justify-center items-center p-2   flex gap-6 '>
                <Link to={`${utilisateur.is_active ? ``:"/login"}`}><CgProfile className={`h-6 w-auto text-vertsombre `}/></Link>
                <BsFillMoonFill className="h-5 w-auto text-vertsombre"/>
                <button onClick={handleLogout}>
                <HiOutlineLogout className={`h-6 w-auto text-vertsombre ${utilisateur.is_active ? 'block':'hidden'}`}  /></button>
                </div> 
        </div>

    </div>
  )
}

export default navbarmodern