import { AiOutlineShoppingCart } from "react-icons/ai"; 
import { AiOutlineShop } from "react-icons/ai"; 
import { AiOutlineAppstoreAdd } from "react-icons/ai"; 
import { AiFillDollarCircle } from "react-icons/ai"; 
import { MdSettings } from "react-icons/md"; 
import { MdLightMode } from "react-icons/md"; 
import { IoMdBook } from "react-icons/io"; 
import { MdPeopleAlt } from "react-icons/md"; 
import Conte from "../components/conte";

const Dashboard = () => {
    return (
        
<div className="h-screen overflow-hidden fixed flex items-center justify-center" >
    <div className="h-screen w-full bg-white relative flex overflow-hidden">

  <div className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-slate-700 text-white">
  
    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
    <MdPeopleAlt  className="h-6 w-6"/>
    </div>

    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <IoMdBook className="h-6 w-6"/>
    </div>

    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
      <MdLightMode className="h-6 w-6"/>
    </div>

  
    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
      <MdSettings className="h-6 w-6"/>
    </div>
  </div>

  
  
 
  <div className="w-full h-full flex flex-col justify-between">
  
  {/* header */}
    {/* <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-slate-700">
     
      <div className="flex flex-shrink-0 items-center space-x-4 text-white">
        
        
        <div className="flex flex-col items-end ">
       
          <div className="text-md font-medium ">Bryan Garrix</div>
        
          <div className="text-sm font-regular">Student</div>
        </div>
        
        <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
      </div>
    </header> */}

            {/* contenue */}

    <main className="bg-green-950 text-white max-w-full h-full flex relative overflow-y-hidden">
      
      <div className="h-full w-full m-10  flex flex-wrap items-start justify-start rounded-tl grid-cols-3 gap-4 overflow-scroll">
        
      <div className="w-56 h-32 rounded-lg items-center flex-shrink-0 flex-grow bg-gradient-to-tr from-purple-700 to-fuchsia-600 grid grig-cols-2 cursor-pointer shadow-xl hover:bg-slate-200">
          <div className="flex m-2 justify-start items-center">
            
              <AiFillDollarCircle className=" justify-start w-16 h-auto" />
             <div className="justify-between">
               <p className="font-bold text-3xl text-gray-100">352.000 <span>Ar</span></p>
               <p className="font-semibold text-gray-300 ">Prix Total</p>
               

            </div>
           </div>
        </div><div className="w-56 h-32 rounded-lg items-center flex-shrink-0 flex-grow bg-gradient-to-br from-fuchsia-700 to-teal-400 grid grig-cols-2 cursor-pointer  shadow-2xl hover:bg-slate-400">
          <div className="flex m-2 justify-start items-center">
            
              <AiOutlineAppstoreAdd className=" justify-start w-16 h-auto"/>
             <div>
               <p className="font-bold text-3xl  text-gray-100">132</p>
               <p className="font-semibold text-gray-300 ">Total Produit</p>

            </div>
           </div>
        </div><div className="w-56 h-32 rounded-lg items-center flex-shrink-0 flex-grow bg-gradient-to-bl from-fuchsia-600 to-teal-400 grid grig-cols-2 cursor-pointer shadow-2xl hover:bg-slate-400">
          <div className="flex m-2 justify-start items-center">
            
              <AiOutlineShop className=" justify-start w-16 h-auto"/>
             <div>
               <p className="font-bold text-3xl  text-gray-200">720</p>
               <p className="font-semibold text-gray-300 ">Produit Reçu</p>

            </div>
           </div>
        </div>
        <div className="w-56 h-32 rounded-lg items-center flex-shrink-0 flex-grow bg-gradient-to-br from-fuchsia-700 to-purple-700 grid grig-cols-2 cursor-pointer shadow-2xl hover:bg-slate-400">
          <div className="flex m-2 justify-start items-center">
            
              <AiOutlineShoppingCart className=" justify-start w-16 h-auto"/>
             <div>
               <p className="font-bold text-3xl  text-gray-200">15</p>
               <p className="font-semibold text-gray-300 ">Total Ventes</p>

            </div>
           </div>
        </div>
        <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow ">
          <Conte/>
        </div>
      </div>
    </main>
  </div>

</div>
</div>
    );
}

export default Dashboard