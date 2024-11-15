"use client";
import React, { useEffect, useState } from 'react';

const Burbuja = ({ messages }) => {
  const [mensajes, setMensajes] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (messages) {
      setMensajes(messages);
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentMessageIndex((prevIndex) =>
          prevIndex < mensajes.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 5000); // 5000 ms = 5 segundos
    setCurrentMessageIndex(0);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    
  }, [mensajes, isPaused]);

  const handleNextMessage = () => {
    setIsPaused(true); // Pausa el avance automático al hacer clic
    setCurrentMessageIndex((prevIndex) =>
      prevIndex < mensajes.length - 1 ? prevIndex + 1 : 0
    );
    setTimeout(() => setIsPaused(false), 5000); // Retoma el avance automático después de 5 segundos
  };

  return (
    <div className="relative w-96 h-24 p-4 bg-gray-500 bg-opacity-60 text-white rounded-lg flex items-center justify-center">
      {mensajes.length > 0 ? (
        <>
          <p className="text-sm font-semibold text-center">{mensajes[currentMessageIndex]}</p>
          <div
            className="absolute w-4 h-4 bg-gray-500 bg-opacity-60 transform rotate-45 -bottom-2 left-32"
            style={{ clipPath: "polygon(0 100%, 100% 0, 130% 120%)" }}
          />
          <button
            onClick={handleNextMessage}
            className="ml-4 bg-gray-700 p-2 rounded-full text-white bg-opacity-60 hover:bg-gray-800 absolute right-2 bottom-2"
          >
            ➔
          </button>
        </>
      ) : (
        <p className="text-sm font-semibold text-center">No hay mensajes.</p>
      )}
    </div>
  );
};

export default Burbuja;
