import { AiFillCloseCircle } from "react-icons/ai"; 
import {useEffect,useState}from 'react'

import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const today = new Date().toISOString().split("T")[0];

const Rdv = ({closeRdv}) => {
const [date,setDate] = useState()
const [Heure,setHeure] = useState()
const [Motif,setMotif] = useState()
const token = localStorage.getItem('access_token')

const demanderdv = async (e) => {
    e.preventDefault();
    toast.dismiss()
    if(!date || ! Motif) {
        toast.error('Completez tous les chams')
    }else {

    
    const data = {
        date : date,
        message : Motif,
        heure : Heure
    }

   try {
             const response = await fetch('http://localhost:8000/rendezvous/',{
                method: 'POST',
                headers: {
                   'Authorization': `Bearer ${token}`,
                   "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const respondeData = await response.json();
    if (response.ok){
        toast.success("demande de Rendez-vous success");
        setTimeout(() => {
            closeRdv()
        }, 1000);
    }
   }
   catch {

   }
   }
}


  return (
    <div className='bg-black/50 max-w-lg  w-full p-3 rounded  grid grid-cols-1   gap-3'>
         <ToastContainer
                                    position="top-right"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    theme="light"
                                    pauseOnHover
                                    transition={Bounce}
                                  />
            <button className="justify-end flex " onClick={closeRdv}><AiFillCloseCircle  className="text-red-500 h-6 w-auto"/></button>
            <p className="text-center  font-bold text-white">Heure d'ouverture : </p>
            <p className="text-center  font-bold text-white">08:00-12:00 <br />13:30-17-00</p>
            <div className="grid grid-cols-2 gap-3">
                <input type="date" name="" id=""  min={today}
                       onChange={(e) => setDate(e.target.value)}
                       className="h-10 rounded p-1 justify-center items-center focus:ring-0 focus:outline-none "/>
                <input type="time"
                        onChange={(e) => setHeure(e.target.value)}
                name="" id="" className="h-10 rounded p-1 justify-center items-center focus:ring-0 focus:outline-none "/>
                
            </div>
            <div className="w-full grid grid-cols-1 gap-1">
                <label htmlFor="" className="p-1 font-semibold text-white">Motif :</label>
                <input type="text"  className="h-10 rounded "
                onChange={(e) => setMotif(e.target.value)}/>
                <button className="bg-vert rounded h-10 mt-10 text-white hover:bg-vertgris" onClick={demanderdv}>Demander</button>
            </div>

    </div>
  )
}

export default Rdv