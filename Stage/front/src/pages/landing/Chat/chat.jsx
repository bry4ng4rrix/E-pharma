import {React,useEffect,useRef,useState} from 'react'
import { AiFillCloseCircle } from "react-icons/ai"; 
import logo from '../../../assets/img/logo.png'
import Chatform from './Chatform';
import Chatmessage from './Chatmessage';

const chat = ({closeBot}) => {
  const [chathistory,setChathistory] = useState([]);
  const chatbody = useRef();

useEffect(() =>{
    chatbody.current.scrollTo({top: chatbody.current.scrollHeight,behavior:"smooth"});
},[chathistory])
   
  const botresponse = async (history) =>{
    // console.log("Original chathistory from state:", history);

    const updateHistory =(text) =>{
      setChathistory(prev => [...prev.filter(msg => msg.text !=="En attent ...."),{role: "model",text}])
    }

    const systemInstructionContent = {
      role: "user", // Using "user" role to prepend the instruction.
      parts: [{ text: "tu t'appelle bot mahquafy,  un assistant médical spécialisé. Ta seule fonction est de répondre à des questions concernant la santé, le bien-être, les maladies, les traitements médicaux et les conseils de prévention. Ne réponds à aucune question qui sort de ce cadre strict. Si une question n'est pas liée à la santé, décline poliment en expliquant que tu es programmé uniquement pour les sujets médicaux." }]
    };

    const mappedUserHistory = history.map(({role,text}) => ({role,parts: [{text}]}));

    const contentsForApi = [systemInstructionContent, ...mappedUserHistory];

 try {
    const requestOptions = {
      method : "POST",
      headers : {"Content-Type":"application/json"}, // Corrected typo from applcation to application
      body: JSON.stringify({contents : contentsForApi})
    };

    
          const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
          const data = await response.json();

          if(!response.ok) {
            const errorMessage = data?.error?.message || "Une erreur s'est produite lors de la récupération de la réponse de l'assistant.";
            console.error("API Error:", errorMessage, data); // Log detailed error
            throw new Error(errorMessage); // Throw error to be handled by the catch block
          }

          // console.log('API Response Data:', data); 

          // Safely access the response text
          if (data && data.candidates && data.candidates.length > 0 &&
              data.candidates[0].content && data.candidates[0].content.parts &&
              data.candidates[0].content.parts.length > 0 &&
              typeof data.candidates[0].content.parts[0].text === 'string') {
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText);
          } else {
            console.error("Unexpected API response structure or missing text:", data);
            updateHistory("Désolé, la réponse de l'assistant est dans un format inattendu ou est incomplète.");
          } 
     }catch (error){
          console.error("Erreur dans botresponse (fetch ou traitement):", error);
          const displayErrorMessage = (error instanceof Error && typeof error.message === 'string' && error.message) ? error.message : "Une erreur technique est survenue lors de la communication avec l'assistant.";
          updateHistory("connexion Internet requis");
     }
  }

  return (
     <div className="bg-black/20  shadow-2xl border borde-white max-w-xl w-full h-3/4  backdrop-blur-lg flex-col justify-between flex rounded-xl  ">
                            
      {/* En-tête du chat */}
      <div className="flex  items-center justify-between p-3   shadow-sm rounded">

        <img src={logo} alt=""  className="h-12 w-auto"/>
        <button className="mr-4 text-gray-500" onClick={closeBot}><AiFillCloseCircle  className="h-6 w-auto text-red-500"/></button>
        
      </div>

      {/* Corps du chat */}
      <div ref={chatbody} className="flex-1  p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {/* Message reçu */}
          <div className="max-w-xs bg-vertsombre/50 rounded-lg p-3 flex  justify-between shadow">
            <p className=" text text-white">Bonjour !, Je suis un assistant médical. Posez-moi des questions liées à la santé uniquement.</p>
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
  )
}

export default chat