import {Reactn,useRef} from 'react'

import { BsFillRocketTakeoffFill } from "react-icons/bs"; 


const Chatform = ({chathistory,setChathistory,botresponse}) => {
    const inputRef = useRef()
    const Envoyer =(e) =>{
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return ;
        inputRef.current.value = "";
        
        setChathistory((history) => [...history,{role : "user", text : userMessage}]);

        setTimeout(() => setChathistory((history) => [...history,{role : "model", text : 'En attent ....'}]),
        botresponse([...chathistory,{role : "user", text : userMessage}]),
        600);
  

    }
  return (
   <div  className="flex items-center space-x-2" onSubmit={Envoyer}>
          <input
            type="text"
            placeholder="Votre demande "
            className="flex-1 p-3  rounded-l-lg focus:outline-none "
            ref={inputRef}
          />
          <button className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-vertlight" onClick={Envoyer}>
           <BsFillRocketTakeoffFill  className="h-6 w-auto " />
            
          </button>
        </div >
  )
}

export default Chatform