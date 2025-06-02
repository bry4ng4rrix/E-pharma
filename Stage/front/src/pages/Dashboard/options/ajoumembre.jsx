import React, { useState } from 'react'
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import review from '../../../assets/img/reviewstar.png'
import 'react-toastify/dist/ReactToastify.css';







const ajoumembre = ({toogleAdd}) => {


  const[Member_name,setMember_name] = useState('');
  const[Member_Code,setMember_Code] = useState('');
  const[Depth,setDepth] = useState('');
  const[Directline,setDirectline] = useState('');
  const[Sponsor,setSponsor] = useState('');
  const[Reg_Date,setReg_Date] = useState('');
  const[Grade,setGrade] = useState('');
  const[Gbv,setGbv] = useState('');
  const[Cpbv,setCpbv] = useState('');
  const[Cnbv,setCnbv] = useState('');
  const[Pbv,setPbv] = useState('');
  const[Tnbv,setTnbv] = useState('');
  const[Branch,setBranch] = useState('');

  const enregistre = async (e) =>{
        e.preventDefault();
        toast.dismiss()    
        if(!Member_Code || !Member_name || !Depth || !Directline||!Sponsor||!Reg_Date||
          !Grade||!Gbv||!Cpbv||!Cnbv||!Pbv||!Tnbv||!Branch){
          toast.error('veuiller remplire tous les champs')
        }
        const data = {
          member_code : Member_Code,
          member_name: Member_name ,
          depth : Depth,
          directline: Directline,
          sponsor : Sponsor,
          registration_date : Reg_Date,
          grade : Grade,
          gbv : Gbv,
          cpbv : Cpbv,
          cnbv : Cnbv,
          pbv : Pbv,
          tnbv : Tnbv,
          branch : Branch
        }
        try{
            const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

        }
        catch {

        }
  }

  return (
    <div className=' justify-center items-center rounded '>
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
<div className=" text-fonddark flex items-center justify-center  bg-lime-50">
         

            <div className="flex w-full h-[75vh]   bg-lime-50 shadow-xl rounded-xl  transition-all duration-300">
            {/* gauche */}
            <div className=" bg-gradient-to-br from-vert via-vertdark to-vert h-[75vh] flex-1 justify-center items-center flex rounded-l-md">
                 
                  <form className='p-2 grid grid-cols-1 gap-5  m-5' >
                    <div className='text-center text-2xl font-bold font-istok m-5 text-vertblanc'>
                      Ajouter Un nouveau Membre
                    </div>
                        <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='Member Name' onChange={(e) => setMember_name(e.target.value)}/>
                       <div className='grid grid-cols-3 gap-3'>
                        <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='Member Code' onChange={(e) => setMember_Code(e.target.value)}/>
                        <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='Directline' onChange={(e) => setDirectline(e.target.value)}/>
                        <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='Sponsor' onChange={(e) => setSponsor(e.target.value)}/>
                      </div> 
                    <div className=' gap-5 grid  grid-cols-2'>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='GBV' onChange={(e) => setGbv(e.target.value)}/>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='CPBV' onChange={(e) => setCpbv(e.target.value)}/>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='CNBV' onChange={(e) => setCnbv(e.target.value)}/>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='PVB' onChange={(e) => setPbv(e.target.value)}/>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='TNBV' onChange={(e) => setTnbv(e.target.value)}/>
                    <input required type="date" className='bg-vertblanc p-2 h-10 rounded shadow-xl text-vertsombre' placeholder='REGISTRATION DATE' onChange={(e) => setReg_Date(e.target.value)}/>
                    </div>

                    
                    <div className='grid grid-cols-4 gap-3'>

                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='Depth' onChange={(e) => setDepth(e.target.value)}/>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' placeholder='Grade' onChange={(e) => setGrade(e.target.value)}/>
                    <input required type="text" className='bg-vertblanc p-2 h-10 rounded shadow-xl' value='MG01' onChange={(e) => setBranch(e.target.value)}/>  
                    <input type='submit' className='bg-vertlight rounded  text-vertdark hover:bg-vertblanc shadow-xl hover:text-vertsombre' onClick={enregistre} placeholder='Enregistre'/>
                    </div>
                   
                  
                  </form>
                </div>
               
          {/* droite */}
              <div className=" hidden md:block flex-1  md:rounded rounded-r-md  bg-vertblanc" >
                    <div className="flex items-center justify-center h-full">
                      
                       <img src={review} alt="" className='h-[60vh]' />
                    </div>
                </div>
                
                
            </div>
        </div>
        
    </div>
  )
}

export default ajoumembre