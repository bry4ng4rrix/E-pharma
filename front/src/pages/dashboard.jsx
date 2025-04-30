import { CgAtlasian } from "react-icons/cg"; 
import { MdSettings } from "react-icons/md"; 
import { MdLightMode } from "react-icons/md"; 
import { IoMdBook } from "react-icons/io"; 
import { MdPeopleAlt } from "react-icons/md"; 

const Dashboard = () => {
    return (
        
<div className="h-screen overflow-hidden fixed flex items-center justify-center" >
    <div className="h-screen w-full bg-white relative flex overflow-hidden">

  <div className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
  
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

  
  {/* header */}
 
  <div className="w-full h-full flex flex-col justify-between">
  
    <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
     
      <div className="flex flex-shrink-0 items-center space-x-4 text-white">
        
        
        <div className="flex flex-col items-end ">
       
          <div className="text-md font-medium ">Bryan Garrix</div>
        
          <div className="text-sm font-regular">Student</div>
        </div>
        
        <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400">p</div>
      </div>
    </header>

            {/* contenue */}

    <main className="max-w-full h-full flex relative overflow-y-hidden">
      
      <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max  gap-4 overflow-y-scroll">
        
        <div className="w-96 h-60 rounded-lg items-center flex-shrink-0 flex-grow bg-green-400 grid grig-cols-2">
            <div className="m-5"><CgAtlasian className="text-white h-16 w-16"/>
            <p className="text-white text-2xl">Produit Total</p></div>
            <div className="w-56 bg-slate-800"></div>
        </div>
        <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-blue-400"></div>
        <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-red-400"></div>
        <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-yellow-500"></div>
        <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-purple-500"></div>
      </div>
    </main>
  </div>

</div>
</div>
    );
}

export default Dashboard