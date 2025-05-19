import { FaUserCheck } from "react-icons/fa"; 
import loginBg from '../../assets/img/login.png'
const Register = () => {
    return (
        <div className=" text-fonddark flex items-center justify-center min-h-screen  bg-vertblanc">

         
            <div className="flex sm:w-full min-w-96 xl:max-w-4xl   bg-[#A3D6E5] shadow-xl rounded-xl">
            {/* gauche */}
            <div className=" bg-white  h-[90vh] flex-1 p-8 rounded-l-md">
                    <div className="w-full max-w-md mx-auto p-5">
                        <div className='font-inter font-bold text-4xl mb-5'>Enregistre</div>
                        <div className='font-inter text-md opacity-50 mb-2'>Cher Client ! Veuiller remplire tous les <br />champs</div>
                        <div className="flex gap-2 mb-2" >
                            <input type="text" placeholder="Noms" className='rounded-sm mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm '/>
                            <input type="text" placeholder="Prenoms" className='rounded-sm mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm'/>
                        </div>
                        <input type="texte" placeholder="Adresse" className='mb-2 placeholder-text-sm rounded-sm  mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm' />
                        <input type="email" placeholder="Email" className='mb-2 placeholder-text-sm rounded-sm  mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm' />
                        
                        <input type="password" placeholder="Mot de pass" className='mb-2 rounded-ms mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm' />
                        <input type="password" placeholder="Confirmer le  mot de pass" className='mb-2 rounded-sm  mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm' />
                      
                       
                          
                        <button type="submit" className='mb-2 flex items-center justify-between px-4 py-2 font-bold text-white bg-[#224F59] rounded-sm mt-6 w-full h-10 shadow-xl hover:bg-vertdark'>
                            <span className="flex-1 text-center">Enregistre</span>
                            <FaUserCheck  className="w-5 h-5" />
                           
                        </button>
                        <div className="mt-10 text-sm px-2 text-gray-700">Deja un compte ? <a href="/login" className="text-[#224F59] font-semibold">Connexion</a></div>
                    </div>
                </div>
               
          {/* droite */}
          <div className=" hidden md:block flex-1 p-8 md:rounded rounded-r-md  bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }}>
                    <div className="flex items-center justify-center h-full">
                        <div className=" font-istok text-5xl font-bold text-white">
                            Tongasoa <br /> Ianao !
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Register