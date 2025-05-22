import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const res = await fetch('http://localhost:8000/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.response || data.error);
  };

  return (
    <div className='text-center justify-center items-center flex-col ' style={{ padding: '20px' }}>
      <h2 className='text-green-500'>Chatbot Médical</h2>
     <input type="text"  className='m-5 h-10 border border-gray-400 rounded' onChange={(e) => setMessage(e.target.value)}/>
      <br />
      <button onClick={sendMessage} className='h-10 bg-blue-500 m-5 p-2 rounded text-white shadow-xl'>Envoyer</button>
      <div style={{ marginTop: '20px' }}>
        <strong>Réponse :</strong>
        <p className='rounded border border-gray-100 bg-green-100'>{response}</p>
      </div>
    </div>
  );
}

export default Chatbot;
