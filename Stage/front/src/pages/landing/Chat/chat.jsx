import {React,useState} from 'react'
import { AiFillCloseCircle } from "react-icons/ai"; 
import logo from '../../../assets/img/logo.png'
import Chatform from './Chatform';
import Chatmessage from './Chatmessage';

const chat = ({closeBot}) => {
  const [chathistory,setChathistory] = useState([]);
  const [message,setMessage] = useState("");
  const [response, setResponse] = useState('');

  const botresponse =(history) =>{
     
  }
  const Envoyer = async () =>{
    const res = await fetch('http://localhost:8000/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.response || data.error);
    
}
  return (
     <div className="bg-black/20 shadow-2xl border border-white max-w-xl w-full h-3/4  backdrop-blur-lg flex-col justify-between flex rounded-xl  ">
                            
      {/* En-tête du chat */}
      <div className="flex  items-center justify-between p-3   shadow-sm rounded">

        <img src={logo} alt=""  className="h-12 w-auto"/>
        <button className="mr-4 text-gray-500" onClick={closeBot}><AiFillCloseCircle  className="h-6 w-auto text-red-600"/></button>
        
      </div>

      {/* Corps du chat */}
      <div className="flex-1  p-4 overflow-y-auto">
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