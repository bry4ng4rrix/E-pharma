
import { BsRocketTakeoffFill } from "react-icons/bs";
import loginBg from '../../assets/img/login.png'
import { useState,useEffect } from "react";
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const Login = async () => {

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        localStorage.setItem('access_token', result.access);
        localStorage.setItem('refresh_token', result.refresh);
        localStorage.setItem('email',result.email);
        localStorage.setItem('is_active', result.user.is_active ? 'true' : 'false');
        localStorage.setItem('is_superuser', result.user.is_superuser ? 'true' : 'false');

        toast.success('Connexion réussie !');
        navigate(result.user.redirect_url);

      } else {
        // Vérifier si c'est une erreur de serializer
        if (result.non_field_errors) {
          toast.error(result.non_field_errors[0]);
        } else if (result.detail) {
          toast.error(result.detail);
        } else if (result.email) {
          toast.error('Email non reconnu');
        } else if (result.password) {
          toast.error('Mot de passe incorrect');
        } else {
          toast.error('Identifiants incorrects');
        }
      }
    } catch (error) {
      toast.error('Erreur réseau ou serveur indisponible.');
    }
  };


    return (
        <div className=" text-fonddark flex items-center justify-center min-h-screen  bg-vertblanc">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            pauseOnHover
            transition={Bounce}
          />


            <div className="flex sm:w-full min-w-96 xl:max-w-4xl   bg-[#A3D6E5] shadow-xl rounded-xl transition-all duration-300">
            {/* gauche */}
                <div className=" hidden md:block flex-1 p-8 md:rounded rounded-l-md  bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }}>
                    <div className="flex items-center justify-center h-full">
                        <div className=" font-istok text-5xl font-bold text-white">
                            Tongasoa <br /> Ianao !
                        </div>
                    </div>
                </div>
          {/* droite */}

                <div className=" bg-white  h-[90vh] flex-1 p-8 rounded-r-md">
                    <div className="w-full max-w-md mx-auto p-5">
                        <div className='font-inter font-bold text-4xl mb-5'>Login</div>
                        <div className='font-inter text-md opacity-50 mb-2'>Cher Client ! Veuiller remplire tous les <br />champs</div>

                        <div className='font-inter mb-1 text-sm opacity-50 px-2'>Email</div>
                        <input type="email" placeholder="exemple@gmail.com" className='rounded-md mt-2 h-10 p-3 w-full border border-gray-500 focus:border-none focus:rounded-sm' onChange={(e) => setEmail(e.target.value)}/>
                        <div className='font-inter mb-1 mt-4 text-sm opacity-50 px-2'>Mot de pass</div>
                        <input type="password" placeholder="* * * * * * " className='rounded-md mt-2 h-10 p-3 w-full border border-gray-500 focus:border-none focus:rounded-sm'  onChange={(e) => setPassword(e.target.value)}/>


                          <div className='text-end text-sm mt-10 opacity-50'>Mot de pass oublier ?</div>
                        <button type="submit"
                                className='flex items-center justify-between px-4 py-2 font-bold
                                         text-white bg-[#224F59] rounded-md mt-6 w-full h-10
                                        shadow-xl hover:bg-vertdark'
                                onClick={Login}
                         >
                            <span className="flex-1 text-center">Login</span>
                            <BsRocketTakeoffFill className="w-5 h-5" />

                        </button>
                        <div className="mt-10 text-sm px-2 text-gray-700">Nouveau? <a href="/register" className="text-[#224F59] font-semibold">Inscription</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login