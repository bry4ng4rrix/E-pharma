import React, { useRef } from 'react';
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const Chatform = ({ sendMessage }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = inputRef.current.value.trim();
    if (!message) return;
    sendMessage(message);
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Votre message"
        className="flex-1 p-3 rounded-l-lg focus:outline-none"
        ref={inputRef}
      />
      <button
        type="submit"
        className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-vertlight"
      >
        <BsFillRocketTakeoffFill className="h-6 w-auto" />
      </button>
    </form>
  );
};

export default Chatform;
