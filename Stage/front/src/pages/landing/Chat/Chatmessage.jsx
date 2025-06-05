import React from 'react'

const Chatmessage = ({chat}) => {
  return (
    
            // <div className="ml-auto max-w-xs bg-teal-500 text-white rounded-lg p-3 shadow">
            // <p className="text-white">Par exemple : symptômes du grippe</p>
            // </div>


              <div className={`max-w-xs rounded-lg p-3 flex items-end justify-between shadow ${chat.role === "model" ? 'bot bg-vert' :'user bg-teal-500 ml-auto'}`}>
                      
                      <p className="text-white">{chat.text}</p>
              </div>
  )
}

export default Chatmessage