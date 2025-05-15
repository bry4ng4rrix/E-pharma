import { AiFillPlusCircle } from "react-icons/ai"; 
import { BsPencil } from "react-icons/bs"; 
import { BiTrash } from "react-icons/bi"; 
import { useEffect, useState } from "react";
import { redirect } from "react-router";
import Navbar from "./Navbar";
const Conte = () => {


      const [Produit ,setProduit] = useState([]);
      const [Nom,setNom] = useState([])
      const [Nombre,setNombre] = useState([])
      const [Description,setDescription] = useState([])
      const [Prix,setPrix] = useState([])


      useEffect(() => {
        fetchProduit();
    
        
      }, []);
    
      const fetchProduit = async () =>{
    
        try {
          const response = await fetch("http://localhost:8000/api/produits/");
          const data = await response.json();
          setProduit(data);
          
    
        }catch (err){
          console.log(err);
        }
    
      };
      const deleteP = async (pk) =>{
        try {
          const response = await fetch(`http://localhost:8000/api/produits/${pk}/`,{
            method: "DELETE",
          });
        const data =  await response.json();
         setProduit((prev) => prev.filter((util) => util.id !== pk));
        }
        catch (err){
          alert('vofafa e');
          redirect('/')
        }
      }

    return (
        <>
        <div className="h-screen  w-full  ">
                
            <div className="w-full h-screen justify-center items-center gap-y-2">
            
                <div className=" h-full">
                    <div className="h-1/4 w-fullp-5 flex  lg:flex-row  gap-2 items-center text-xs lg:text-base">
                        <div className="w-full">
                            <div className="font-semibold text-lg lg:text-2xl">Produits</div>
                            <div>Liste des produit dans le stocks avec leur prix et descriptions </div>
                        </div>
                        <div className="w-full  lg:text-end">
                            <button className="bg-blue-500 text-white p-2 gap-2  rounded-lg "><span className="flex gap-2 justify-center items-center"> <AiFillPlusCircle className="h-5 w-auto "/>Ajouter</span></button>
                        </div>

                    </div>

                    <div className="hidden  lg:block max-w-full p-5 w-full h-full text-sm">
                        <table className="p-5 w-full "> 
                            <thead className="border-b ">
                                <tr className="">
                                    <th className="font-bold text-start py-2 pr-2 w-2/12">Noms</th>
                                    <th className="font-bold text-start py-2 pr-2 w-2/12">Description</th>
                                    <th className="font-bold text-start py-2 pr-2 w-1/12">Prix</th>
                                    <th className="font-bold text-start py-2 pr-2 w-1/12">Date</th>
                                    <th className="font-bold text-start py-2 pr-2 w-1/12">Option</th>
                                </tr>

                            </thead>
                            {Produit.map((util) => (
                            <tbody>
                            <tr className="border-b">
                                    <td className="py-3">
                                        <div className="flex gap-2">
                                            <div className="h-10 w-10 rounded-full bg-slate-700"></div>
                                            <div>
                                                <div className="font-medium">{util.Nom}</div>
                                                <div className="text-gray-400">Nombre : {util.Nombre}</div>

                                            </div>

                                        </div>

                                    </td>
                                    <td>
                                        <div className="font-medium">{util.Description}</div>
                                    </td>
                                    <td>
                                        <div className="w-fit bg-blue-200  px-2  py-1 text-green-900 font-semibold border  border-blue-400 rounded-lg">{util.Prix} <span>Ar</span></div>
                                    </td>
                                    <td>
                                        <div> 05/02/2024</div>
                                    </td>
                                    <td>
                                   
                                         <div className="flex gap-2">
                                         <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-900 hover:text-white "><span className="flex gap-2 justify-center items-center" onClick={() => deleteP(util.id)}><BiTrash />Suprimer</span></button>
                                         <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-900 hover:text-white "><span className="flex gap-2 justify-center items-center"><BsPencil />Modifier</span></button>
                                     
                                         </div>
                                    </td>

                                </tr>
                            </tbody>
                            ))}

                        </table>

                    </div>

                        <div className="h-3/4 grid lg:hidden grid-cols-1 md:grid-cols-2 p-5 gap-2 overflow-y-scroll text-xs lg:text-base ">
                        {Produit.map((util) => (
                            <div className="border rounded-lg flex items-center p-2 gap-2 ">
                                <div className="w-1/4">
                                    <div className="w-16 h-16 rounded-full bg-slate-700"></div>
                                  </div>      

                                    <div className="w-3/4 ">
                                        <div className="font-medium">{util.Nom}</div>
                                        <div className="text-gray-300">Bv : {util.Bv}</div>
                                        <div className="text-gray-300">$ : {util.Dollard}</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>{util.Description}</div>
                                                <div className=" flex gap-2 ">
                                                            <button className=" w-fit bg-red-500 text-white p-2 rounded-lg hover:bg-red-900 hover:text-white "onClick={() => deleteP(util.id)}><BiTrash /></button>
                                                            <button className=" w-fit bg-green-500 text-white p-2 rounded-lg hover:bg-green-900 hover:text-white "><BsPencil /></button>
                                                        </div>
                                                <div className="w-fit bg-blue-200  px-2  py-1 text-xs text-green-900 font-semibold border  border-blue-400 rounded-lg">{util.prix_distributeur}<span>Ar</span></div>
                                                <div className="w-fit bg-blue-200  px-2  py-1 text-xs text-green-900 font-semibold border  border-blue-400 rounded-lg">{util.Prix_en_detail}<span>Ar</span></div>
                                                
                                                       
                                                
                                            </div>

                                    </div>

                                </div>
                            ))}

                            </div>

                        </div>

                </div>
            </div>


        
        
        </>

    )
}

export default Conte