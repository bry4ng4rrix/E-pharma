import {React,useEffect,useRef,useState} from 'react'
import { AiFillCloseCircle } from "react-icons/ai"; 
import logo from '../../../assets/img/logo.png'
import Chatform from './Chatform';
import Chatmessage from './Chatmessage';

const message = ({closemessage}) => {
  const [chathistory,setChathistory] = useState([]);
    const chatbody = useRef();
  
  useEffect(() =>{
      chatbody.current.scrollTo({top: chatbody.current.scrollHeight,behavior:"smooth"});
  },[chathistory])
     
    const botresponse = async (history) =>{
      
  
      const updateHistory =(text) =>{
        setChathistory(prev => [...prev.filter(msg => msg.text !=="En attent ...."),{role: "model",text}])
      }
  
      const systemInstructionContent = {

        parts: [{ text: "tu t'appelle bot mahquafy,  un assistant médical spécialisé. Ta seule fonction est de répondre à des questions concernant la santé, le bien-être, les maladies, les traitements médicaux et les conseils de prévention. Ne réponds à aucune question qui sort de ce cadre strict. Si une question n'est pas liée à la santé, décline poliment en expliquant que tu es programmé uniquement pour les sujets médicaux." }]
      };


      const mappedUserHistory = history.map(({role,text}) => ({role,parts: [{text}]}));
      const contentsForApi = [systemInstructionContent, ...mappedUserHistory];
  
   try {
      const requestOptions = {
        method : "POST",
        headers : {"Content-Type":"application/json"}, 
        body: JSON.stringify({contents : contentsForApi})
      };
  
      
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
  
            if(!response.ok) {
              const errorMessage = data?.error?.message || "Une erreur s'est produite lors de la récupération de la réponse de l'assistant.";
              console.error("API Error:", errorMessage, data); // Log detailed error
              throw new Error(errorMessage); // Throw error to be handled by the catch block
            }
  
            if (data && data.candidates && data.candidates.length > 0 &&
                data.candidates[0].content && data.candidates[0].content.parts &&
                data.candidates[0].content.parts.length > 0 &&
                typeof data.candidates[0].content.parts[0].text === 'string') {
              const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
              updateHistory(apiResponseText);
            } else {
             
              updateHistory("Désolé, la réponse de l'assistant est dans un format inattendu ou est incomplète.");
            } 
       }catch (error){
            console.error("Erreur dans botresponse (fetch ou traitement):", error);
            const displayErrorMessage = (error instanceof Error && typeof error.message === 'string' && error.message) ? error.message : "Une erreur technique est survenue lors de la communication avec l'assistant.";
            updateHistory("connexion Internet requis");
       }
    }
  
  return (
    <div className="bg-black/50 shadow-2xl border border-white max-w-4xl w-full h-3/4  backdrop-blur-lg   flex rounded-xl  ">

                  <div className='flex h-full flex-col justify-between w-full'>
                        <div className=' h-10 rounded mt-3 w-full mx-3 p-3 flex flex-1 justify-between '>
                                  </div>
                                  <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}  className='w-full  m-3 rounded  
                                                                                                               px-3 grid grid-cols-1 gap-3 
                                                                                                               overflow-y-auto overflow-hidden '>
                                     <div>
                                       <div className='h-16 hover:bg-vert bg-white p-1 items-center  rounded flex space-x-4'> 
                                        <img src="" alt=""  className='h-10 w-10  rounded-full bg-fonddark'/>
                                        <div className='grig grid-cols-1'>
                                            <div>kaiza membercode membername</div>
                                            <p>message</p>
                                        </div>
                                      </div>
                                     </div>
                                <div className='h-16 hover:bg-vert bg-white p-3 rounded'></div>
                         </div>


                  </div>
      {/* En-tête du chat */}
                          <div className='flex flex-col justify-between w-full'>
                              <div className="flex items-center justify-between mx-5 mt-5  rounded">
                                <img src="" alt=""  className='bg-white h-10 w-10 rounded-full'/>

                              <button className="mr-4 text-gray-500" onClick={closemessage}><AiFillCloseCircle  className="h-6 w-auto text-red-600"/></button>
                              
                            </div>

                            {/* Corps du chat */}
                            <div ref={chatbody} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}  className="flex-1  p-4 overflow-y-auto m-3 scrollbar-none rounded"  >
                              <div className="flex flex-col space-y-4">
                                {/* Message reçu */}
                                <div className="max-w-xs bg-white/80 rounded-lg p-3 flex  justify-between shadow">
                                  <p className="">Bonjour !,Que puis je vous aidiez</p>
                                </div>
                                {/* Message envoyé */}
                                {chathistory.map((chat,index) => (
                                  <Chatmessage key={index} chat={chat}/>
                                ))}
                                
                              </div>
                            </div>

                            {/* Zone de saisie */}
                            <div className="p-4 rounded-md shadow-xl">
                              <Chatform chathistory={chathistory} setChathistory={setChathistory} botresponse={botresponse}/> 
                            </div>
                          </div>
    </div>
  )
}

export default message