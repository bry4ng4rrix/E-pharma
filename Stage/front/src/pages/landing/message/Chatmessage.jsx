import React from 'react';

const Chatmessage = ({ chat }) => {
  return (
    <div
      className={`max-w-xs rounded-lg p-3 flex items-end justify-between shadow ${
        chat.role === "model" ? 'bot bg-vert' : 'user bg-teal-500 ml-auto'
      }`}
    >
      <p className="text-white">{chat.text || chat.contenu || chat.message}</p>
    </div>
  );
};

export default Chatmessage;
