import {React,useEffect,useRef,useState} from 'react'
import { AiFillCloseCircle } from "react-icons/ai"; 
import logo from '../../../assets/img/logo.png'
import Chatform from './Chatform';
import Chatmessage from './Chatmessage';

const chat = ({closeBot}) => {
  const [chathistory,setChathistory] = useState([]);
  const [message,setMessage] = useState("");
  const [response, setResponse] = useState('');
  const chatbody = useRef();

useEffect(() =>{
    chatbody.current.scrollTo({top: chatbody.current.scrollHeight,behavior:"smooth"});
},[chathistory])
   
  const botresponse = async (history) =>{
    console.log(history)
    const updateHistory =(text) =>{
      setChathistory(prev => [...prev.filter(msg => msg.text !=="en attent..."),{role: "model",text}])
    }
    history = history.map(({role,text}) => ({role,parts: [{text}]}))
    const requestOptions = {
      method : "POST",
      headers : {"Content-Type":"applcation/json"},
      body: JSON.stringify({contents : history})
    }
     try {
          const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
          
          const data = await response.json();
          if(!response.ok) throw new Error(data.error.message || "il y a un erreur");

          console.log('API Response Data:', data); // Log the full data object
          if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText);
          } 
     }catch (error){
          console.log(error)  
     }
  }

  return (
     <div className="bg-black/20 shadow-2xl border border-white max-w-xl w-full h-3/4  backdrop-blur-lg flex-col justify-between flex rounded-xl  ">
                            
      {/* En-tête du chat */}
      <div className="flex  items-center justify-between p-3   shadow-sm rounded">

        <img src={logo} alt=""  className="h-12 w-auto"/>
        <button className="mr-4 text-gray-500" onClick={closeBot}><AiFillCloseCircle  className="h-6 w-auto text-red-600"/></button>
        
      </div>

      {/* Corps du chat */}
      <div ref={chatbody} className="flex-1  p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {/* Message reçu */}
          <div className="max-w-xs bg-vert rounded-lg p-3 flex  justify-between shadow">
            <p className="text-white">Je suis un assistant médical. Posez-moi des questions liées à la santé uniquement.</p>
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