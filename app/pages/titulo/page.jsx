"use client";
import { useState } from 'react';
import Dog from "@/components/perro/dog";
import '@/styles/dog-style.css'; // Asegúrate de que la ruta sea correcta
import Burbuja from "@/components/burbuja-dialogo";
import Header from "@/components/header";
import { useRouter } from 'next/navigation';
import Button from "@/components/button/back";
import Footer from "@/components/footer/footer";
import { Merriweather } from 'next/font/google';
import { DialogoTitulo } from '@/data/dialogs';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'], // Define los pesos que quieras usar
});

export default function Titulo() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const messages = DialogoTitulo;

  const router = useRouter(); // Usar useRouter en el componente

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Actualiza el estado del título
    if (event.target.value.trim() !== "") {
      setError(false); // Quitar el error si hay texto
    }
  };

  const handleClick = () => {
    if (title.trim() === "") {
      setError(true); // Mostrar el error si el título está vacío
      return;
    }

    localStorage.setItem('titulo', title);
    router.push('/pages/genero');
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="relative flex items-center justify-center py-12">
        <div className="relative flex flex-col items-center space-y-10 ">
          <Burbuja messages={messages} />
          <Dog />

          <p className={`${merriweather.className} ml-6 md:ml-1 text-lg leading-6 mb-6`}>
            Inicia tu aventura con un título. ¿Qué nombre llevará nuestra historia?
          </p>

          <form className="w-full max-w-md mx-auto">
            <div className="relative flex flex-col items-center p-2 bg-white rounded w-full text-black">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="min-h-12 leading-10 px-4 w-full"
                placeholder="Título"
              />
              <button
                type="button"
                onClick={handleClick}
                disabled={title.trim() === ""}
                className={`absolute right-1 py-3 px-6 rounded ${title.trim() !== ""
                    ? 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm text-center me-1 mb-1'
                    : 'text-white cursor-not-allowed bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm text-center me-1 mb-1 opacity-50'
                  }`}
              >
                Continuar
              </button>

            </div>
            {error && (
              <p className="text-red-500 mt-2">El título no puede estar vacío.</p>
            )}
          </form>
        </div>
        <Button />
      </div>
      
      
      

    </div>
  );
}