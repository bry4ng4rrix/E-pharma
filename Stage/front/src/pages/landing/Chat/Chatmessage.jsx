import React from 'react'

const Chatmessage = ({chat}) => {
  return (
    
           

              <div className={`max-w-xs rounded-lg p-3 flex items-end justify-between shadow ${chat.role === "model" ? 'bot bg-vertsombre/50 text-white ' :'user bg-vert/70 text-white ml-auto'}`}>
                      
                      <p className="">{chat.text}</p>
              </div>
  )
}

export default Chatmessage