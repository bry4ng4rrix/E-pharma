import { AiOutlineMessage } from "react-icons/ai"; 
import { AiFillAlert } from "react-icons/ai"; 
import { Link } from "react-router";
const Sidebard = () => {

    return (
      <div className="bg-slate-900 text-white sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container  mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex md:flex items-center  flex-shrink-0">
                        <img src="/vite.svg" className="h-10 w-10 mr-2" alt="logo" />
                        <span className="text-xl tracking-tight">B<span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-blue-400">ryan</span></span>
                    </div>
                        <ul className="hidden lg:flex text-[16px] font-bold ml-14 space-x-10 justify-center items-center ">
                            <li><Link to="/home" className="hover:text-cyan-400"><AiFillAlert />Home</Link></li>
                            <li><Link to="/about" className="hover:text-cyan-400"><AiOutlineMessage />about</Link></li>
                            <li><Link to="/contact" className="hover:text-cyan-400">contact</Link></li>
                            <li><Link to="/Authentifier" className="hover:text-cyan-400">Authentifier</Link></li>
                        </ul>
                        <div className="hidden md:flex lg:flex justify-center space-x-6 items-center">
                            <a href="" className="py-2 px-3 bg-slate-600 rounded-md text-[16px] font-bold hover:bg-emerald-400">Connecter</a>
                            <a href="" className="py-2 px-3 bg-violet-950 rounded-md text-[16px] font-bold hover:bg-slate-800 ">Enregistre</a>
                    </div>
                </div>
            </div>
      </div>
    )
  }
  
  
  export default Sidebard;