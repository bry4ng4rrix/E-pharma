import React from 'react'

const Chatmessage = ({chat}) => {
  return (
    
           

              <div className={`max-w-xs rounded-lg p-3 flex items-end justify-between shadow ${chat.role === "model" ? 'bot bg-green-100 ' :'user bg-vert text-white ml-auto'}`}>
                      
                      <p className="">{chat.text}</p>
              </div>
  )
}

export default Chatmessage