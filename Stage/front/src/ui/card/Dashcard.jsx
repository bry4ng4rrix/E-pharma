
import { useState , useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaUsers, FaDollarSign,FaShopify,FaPagelines
}
from 'react-icons/fa';


export const Dashcard = () => {
   useEffect(() =>{
  
    const fetchStats  = async () =>{
      try{
        const response = await fetch("http://localhost:8000/api/stat");
        const data = await response.json();
        setStats(data);
      }catch (err){
        console.log(err)
      }
    };
  
      fetchStats();
      
    },[]);

    const [stats, setStats] = useState(null);
     const statsConfig = [
        { 
          title: "Membre", 
          value: stats?.user || 0,
          icon: <FaUsers className="text-3xl  flex items-center text-blue-500"/>,
          color: 'blue-500'
        },
        { 
          title: "Produits", 
          value: stats?.produit || 0,
          icon: <FaPagelines className="text-3xl text-green-500"/>,
          color: 'purple'
        },
        { 
          title: "Caisse", 
          value: stats?.total_ventes || 0,
          icon: <FaDollarSign  className="text-3xl flex items-center text-yellow-500"/>,
          color: 'green'
        },
        { 
          title: "Vente", 
          value: stats?.vente || 0,
          icon: <FaShopify className="text-3xl flex items-center text-fuchsia-500"/>,
          color: 'yellow'
        },
       
       
      ];
  return (
    
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 m-5 ">
                                        {statsConfig.map((stat, index) => (
                                        <motion.div
                                            key={stat.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={` bg-green-100 dark:bg-vertsombre rounded-lg p-4 shadow-xl hover:shadow-md transition-shadow duration-300 text-green-950 dark:text-white dark:hover:bg-green-100 hover:bg-vertsombre hover:text-green-100 dark:hover:text-fonddark ${
                                            stat.onClick
                                                ? " cursor-pointer hover:bg-gray-50"
                                                : " "
                                            }`}
                                            onClick={stat.onClick}
                                        >
                                            <div className="flex items-center cursor-pointer  justify-between">
                                            <div>
                                                <p className="text-sm   mb-1">
                                                {stat.title}
                                                </p>
                                                <p className="text-2xl font-bold ">
                                                {stat.value}
                                                </p>
                                            </div>
                                            <div
                                                className={`p-3 rounded-full  bg-white shadow-xl `}
                                            >
                                                {stat.icon}
                                            </div>
                                            </div>
                                        </motion.div>
                                        ))}
                                    </div>
  )
}
export default Dashcard ;
