import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState , useEffect } from 'react';
import MuiChart from '../Chart/RadarChart';
import LineChart from '../Chart/linechart';

const table = () => {

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



      const navigate = useNavigate();
      const Edts = [
        {
        title : "Lundi",
        value : 5,
        },
        {
        title : "Mardi",
        value : 10,
        },
        {
        title : "Mercredi",
        value : 15,
        },
        {
        title : "Jeudi",
        value : 12,
        },
        {
        title : "Vendredi",
        value : 9,
        },
        {
        title : "Samedi",
        value : 4,
        },
    ];
  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-5">
    <div className="bg-green-100 dark:bg-vertsombre p-2  dark:text-green-950 rounded-lg shadow-xl"
        >
         

          
              <div  className="flex bg-white shadow-md text-green-600 rounded-lg  hover:text-green-100">
              <LineChart />
              </div>
            
         
       
           
        </div>
        {/* Répartition Par semaine */}
        <div  className="bg-green-100 dark:bg-vertsombre text-vertsombre dark:text-vertblanc p-6 rounded-xl shadow-xl">
          <h3 className="text-xl text-center font-medium  mb-4">
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

                  <div className="flex items-center justify-between p-3 bg-white hover:shadow-2xl text-green-600 shadow-md rounded-lg hover:bg-vertdark hover:text-green-100">
                      <span className="font-semibold text-sm">{stat.title}</span>
                      <span className="font-bold  text-lg">{stat.value}</span>
            </div>

              </motion.div>
            ))}
                  
          </div>
          </div>

        {/* Répartition géographique */}
        

        
      </div>
  )
}

export default table