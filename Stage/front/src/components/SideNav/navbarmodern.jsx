import { HiOutlineLogout } from "react-icons/hi"; 
import { BsFillMoonFill } from "react-icons/bs"; 
import { CgProfile } from "react-icons/cg"; 
import logo from '../../assets/img/logo.png'
import { Link, useNavigate } from "react-router";


const navbarmodern = ({openProfile,openBot}) => {

const is_active = localStorage.getItem("is_active");
const is_superuser = localStorage.getItem("is_superuser");
const navigate = useNavigate();

const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await fetch('http://localhost:8000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
            }

            
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

 

  
  return (
    <div className=' flex  h-16  m-2 p-3 items-center rounded justify-between '>
<img src={logo} alt="logo" className='h-16 m-6' />
        <div className='flex gap-6'>
          
            
            
                <ul className=' hidden sm:flex gap-10 cursor-pointer text-md font-sm font-semibold font-inter items-center text-vertsombre transition-all duration-300 '>
                  
                    <Link to="/">Acceuille</Link>
                    <Link to="/">A propos</Link>
                    <Link to="/">Equipe</Link>
                 
                    <button className={`${is_active ? "block":"hidden"} `} onClick={openBot}>Bot</button>
                    <Link to="/imc" className={`${is_active ? "block":"hidden"} `}>Imc</Link>
                    <Link to="/profile" className={`${is_active ? "block":"hidden"} `}>Profile</Link>
                    <Link to='/admin' className={`${is_superuser ? "block" : "hidden"}`}>Tableau de bord</Link>
                </ul>
            
        </div>
        <div className='h-12 gap-4 rounded-md  p-5  items-center text-white justify-center flex '> 
            <div className='rounded-lg justify-center items-center p-2   flex gap-6 '>
                <Link to={`${is_active ? "/profile":"/login"}`}><CgProfile className={`h-6 w-auto text-vertsombre `}/></Link>
                <BsFillMoonFill className="h-5 w-auto text-vertsombre"/>
                <button onClick={handleLogout}>
                <HiOutlineLogout className={`h-6 w-auto text-vertsombre ${!is_active ? 'hidden':'block'}`}  /></button>
                </div> 
        </div>

    </div>
  )
}

export default navbarmodern