import React, { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import Chatform from './Chatform';
import Chatmessage from './Chatmessage';
import {motion} from 'framer-motion'

const token = localStorage.getItem('access_token');
const Message = ({ closemessage, destinataireId }) => {
  const [chathistory, setChathistory] = useState([]);
  const chatbody = useRef();
  const [utilisateur,setUtilisateur] = useState([])
  const [expediteurId,setExpediteurid] = useState()




  const fetchUtilisateur = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/users',{
        method : "GET",
                    headers : {
                        "Content-type": "application/json",
                    },
                });
                const responseData = await response.json();
                setUtilisateur(responseData)
    }
    catch {

    }
  }

  const voiremessage = (id) =>{
    setExpediteurid(id)
    console.log(expediteurId)
    

  }
  // Scroll auto à chaque update
  useEffect(() => {
    fetchUtilisateur()
    if (chatbody.current) {
      chatbody.current.scrollTo({ top: chatbody.current.scrollHeight, behavior: "smooth" });
    }
  }, [chathistory]);

  // Charger les messages entre expediteur et destinataire au montage
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get-messages/${expediteurId}/5/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Erreur lors du chargement des messages');
        const data = await response.json();
        // Adapter selon ta structure, ici on suppose un tableau de messages
        setChathistory(data);
      } catch (error) {
        console.error('Erreur fetch messages:', error);
      }
    };
    fetchMessages();
  }, [expediteurId, destinataireId, token]);

  // Fonction pour envoyer un message via API
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Ajoute localement pour l'affichage instantané
    setChathistory(prev => [...prev, { role: 'user', text }]);

    try {
      const response = await fetch('/send-message/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contenu: text,
          destinataire: destinataireId
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l’envoi du message');

      const newMessage = await response.json();
      // Ajouter la réponse serveur (avec l'expediteur, date, etc) si nécessaire
      setChathistory(prev => [...prev, { role: 'user', text }]); // Ou mettre la vraie réponse serveur
    } catch (error) {
      console.error('Erreur send message:', error);
      // Optionnel: afficher erreur utilisateur
    }
  };

  return (
    <div className="bg-black/50 shadow-2xl border border-white max-w-4xl w-full h-3/4 backdrop-blur-lg flex rounded-xl">
        <div className='grid grid-cols-2 w-full m-1'>

          <div className=' h-full m-1  p-2 grid grid-cols-1 gap-2 overflow-y-auto scrollbar-none'>
               {utilisateur.map((ut,index) => (
                 <motion.div
                  key={ut.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}

                >
                    <div className='bg-white h-16 p-2 rounded flex gap-2 hover:bg-green-400' onClick={() =>voiremessage(ut.id)}>
                      <img src={ut.image} alt="" className='h-10 w-auto rounded'/>
                      <div>
                        <p className='font-bold'>{ut.username}</p>
                        <p className='text-gray-600'>message</p>
                      </div>
                      
                    </div>
                </motion.div>
               ))}
          </div>

                                     <div className="flex h-full flex-col justify-between w-full">
        {/* En-tête */}
        <div className="flex items-center justify-between mx-5 mt-5 rounded">
          <h2 className="text-white text-lg font-bold">Chat</h2>
          <button className=" text-gray-500" onClick={closemessage}>
            <AiFillCloseCircle className="h-6 w-auto text-red-600" />
          </button>
        </div>

        {/* Corps */}
        <div
          ref={chatbody}
          className="flex-1 p-4 overflow-y-auto m-2 scrollbar-none rounded bg-white/20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-col space-y-4">
            {chathistory.length === 0 && (
              <p className="text-white font-bold  text-center">Pas encore de messages</p>
            )}
            {chathistory.map((chat, index) => (
              <Chatmessage key={index} chat={chat} />
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-4 rounded-md shadow-xl ">
          <Chatform sendMessage={sendMessage} />
        </div>
      </div>

        </div>
    </div>
  );
};

export default Message;
