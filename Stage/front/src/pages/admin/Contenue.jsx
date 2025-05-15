
import { useEffect, useState } from 'react';
import { useFetchers, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaDollarSign,FaShopify,FaPagelines
} from 'react-icons/fa';

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [vente,setVente] = useState([]);

  
 
  
 useEffect(() => {
  const fetchvente  = async () =>{
    try{
      const response = await fetch("http://localhost:8000/api/vente");
      const data = await response.json();
      console.log('Données de vente:', data);
      setVente(data);
    }catch (err){
      console.log(err)
    }
  };
  fetchvente();
},[]);
  
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
  





  const statsConfig = [
    { 
      title: "Utilisateurs", 
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
    <div className="space-y-8 w-full">
      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 ">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={` bg-green-100 rounded-xl p-4 shadow-xl hover:shadow-md transition-shadow duration-300 ${
              stat.onClick
                ? " cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                : " hover:border hover:border-emerald-500"
            }`}
            onClick={stat.onClick}
          >
            <div className="flex items-center cursor-pointer  justify-between">
              <div>
                <p className="text-sm text-gray-500  dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-green-800">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full `}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition Par semaine */}
        <div  className="bg-green-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl text-center font-bold text-green-950 mb-4">
           Produit vendue en une Semaine 
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Edts.map((stat,index) =>(
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">{stat.title}</span>
                      <span className="font-bold dark:text-white">{stat.value}</span>
            </div>

              </motion.div>
            ))}
                  
          </div>
          </div>

        {/* Répartition géographique */}
        <div className="bg-green-100 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-xl font-bold text-center text-green-950 mb-4">Produits Vendue par Type </h3>
          <div className="space-y-3">
            

          {vente.map((vente) => (
              <div key={vente.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">
                  {vente.produit_nom}
                </span>
                <span className="font-bold dark:text-white">
                  {vente.quantite}
                </span>
              </div>
            ))}
         
       
             
          </div>
        </div>


      </div>
    </div>
  );
};

export default DashboardHome;