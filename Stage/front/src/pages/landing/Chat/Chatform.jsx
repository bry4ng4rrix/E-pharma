import {Reactn,useRef,useState} from 'react'
import { BsFillRocketTakeoffFill } from "react-icons/bs"; 


const Chatform = ({chathistory,setChathistory,botresponse}) => {
    const inputRef = useRef("bonjour je suis un asistant medical ")
    const Envoyer =(e) =>{
        e.preventDefault();

        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return ;
        inputRef.current.value = "";
        
        setChathistory((history) => [...history,{role : "user", text : userMessage}]);

        setTimeout(() => setChathistory((history) => [...history,{role : "model", text : 'En attent ....'}]),
        
        600);
  
          setTimeout(() => botresponse([...chathistory,{role : "user", text : userMessage}]),3000)
    }
  return (
   <div  className="flex items-center space-x-2" onSubmit={Envoyer}>
          <input
            type="text"
            placeholder="Votre demande "
            className="flex-1 p-3  rounded-l-lg focus:outline-none "
            ref={inputRef}
          />
          <button className="p-3 bg-vert text-white rounded-r-lg hover:bg-vertlight" onClick={Envoyer}>
           <BsFillRocketTakeoffFill  className="h-6 w-auto " />
            
          </button>
        </div >
  )
}

export default Chatform