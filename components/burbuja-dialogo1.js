// components/Burbuja.js
import React, { useState } from "react";

const Burbuja = ({ messages }) => {
  // Definir los mensajes dentro del componente


  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Función para avanzar al siguiente mensaje o reiniciar al principio si llegamos al final
  const handleNextMessage = () => {
    setCurrentMessageIndex((prevIndex) => 
      prevIndex < messages.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative w-96 h-24 p-4 bg-gray-500 text-white rounded-lg flex items-center justify-center">
   
      <p className="text-sm font-semibold text-center">{messages[currentMessageIndex]}</p>

      
      <div
        className="absolute w-4 h-4 bg-gray-500 transform rotate-45 -bottom-2 left-32"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
      ></div>

      
      <button
        onClick={handleNextMessage}
        className="ml-4 bg-gray-700 p-2 rounded-full text-white hover:bg-gray-800 absolute right-2 bottom-2"
      >
        ➔
      </button>
    </div>
  );
};

export default Burbuja;
