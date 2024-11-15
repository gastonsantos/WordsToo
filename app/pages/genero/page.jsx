"use client";
import { useState } from 'react';
import Dog from "@/components/perro/dog";
import '@/styles/dog-style.css';
import Burbuja from "@/components/burbuja-dialogo";
import Header from "@/components/header";
import { useRouter } from 'next/navigation';
import Button from "@/components/button/back";
import { Merriweather } from 'next/font/google';
import {DialogoGenero} from '@/data/dialogs';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'], // Define los pesos que quieras usar
});
export default function Titulo() {

  
  const genres = [
    { name: "Terror", image: "/images/genres/terror.jpeg" },
    { name: "Romance", image: "/images/genres/Romance1.webp" },
    { name: "Aventura", image: "/images/genres/aventura.jpeg" },
    { name: "Ciencia Ficción", image: "/images/genres/ficcion.jpeg" }
  ];

  const [selectedGenre, setSelectedGenre] = useState(null);
  const router = useRouter();

  // Drag and drop handlers
  const handleDragStart = (event, genre) => {
    event.dataTransfer.setData('text/plain', genre.name);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const genreName = event.dataTransfer.getData('text');
    const genre = genres.find(g => g.name === genreName);
    setSelectedGenre(genre);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Continue button handler
  const handleContinue = () => {
    if (selectedGenre) {
      localStorage.setItem('genero', selectedGenre.name);
      router.push('/pages/tour');
    }
  };

  const messages = DialogoGenero;

  return (
    <div className='h-screen '>
      <Header />
      <div className="relative flex items-center justify-center  py-12">
        <div className="relative flex flex-col items-center space-y-10 ">
        <div className="grid grid-cols-12 justify-between">

       <div className='col-span-12 md:col-span-4 flex flex-col items-center'>
       <Burbuja messages={messages}  />
      
        <Dog />
        <Button />
       </div>
          



          
        <div className="col-span-12 md:col-span-8">


          <div className="flex flex-col items-center">
            <h1 className={`${merriweather.className} ml-2 text-2xl font-bold mb-4`}>Elige un género</h1>

            {/* Lista de géneros arrastrables con imágenes */}
            <div className="flex space-x-4 mb-8">
              {genres.map((genre) => (
                <div
                  key={genre.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, genre)}
                  className="w-24 h-24 cursor-pointer"
                >
                  <img
                    src={genre.image}
                    alt={genre.name}
                    title={genre.name}
                    className="w-full h-full object-cover rounded-lg hover:opacity-80"
                  />
                </div>
              ))}
            </div>

            {/* Área de destino para el género */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-64 h-32 bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400 mb-6"
            >
              {selectedGenre ? (
                <img
                  src={selectedGenre.image}
                  alt={selectedGenre.name}
                  title={selectedGenre.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Arrastra el género aquí</span>
              )}
            </div>

            {/* Botón "Continuar" */}
            <button
              onClick={handleContinue}
              disabled={!selectedGenre}
              className={`py-2 px-6 rounded ${
                selectedGenre
                  ? 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                  : 'text-white cursor-not-allowed bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
        </div>
        </div>
      </div>
     
     
    </div>
  );
}
