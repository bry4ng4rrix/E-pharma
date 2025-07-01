import React, { PureComponent , useState,useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


const piechart = () => {

const [stats,setStats] = useState([]);
  useEffect(() =>{
    
      const fetchStats  = async () =>{
        try{
          const response = await fetch("http://localhost:8000/api/stat");
          const data = await response.json();
          setStats(data);
          console.log(data)
        }catch (err){
          console.log(err)
        }
      };
    
        fetchStats();
        
      },[]);

  const data = [
  {
    subject: 'Utilisateurs',
    A: 25,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Produits',
    A: 20,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Employé',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Membres',
    A: 50,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Ventes',
    A: stats?.vente || 120,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Rendez-vous',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];


  return (
    <>
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" fontSize={12}/>
          
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </>
  )
}

export default piechart