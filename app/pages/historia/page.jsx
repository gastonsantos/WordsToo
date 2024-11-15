"use client";
import { useState, useRef } from 'react';
import DogFiccion from "@/components/perro/dog-ficcion";
import DogLove from "@/components/perro/dog-love";
import DogTerror from "@/components/perro/dog-terror";
import DogAdventure from "@/components/perro/dog-adventure";
import Dog from "@/components/perro/dog";
import Burbuja from "@/components/burbuja-dialogo";
import Header from "@/components/header";
import Button from "@/components/button/back";
import Image from "next/image";
import { sendHistoryToIa, convertirPdf } from "@/services/historia/api";
import { Merriweather } from 'next/font/google';
import { DialogoAventura, MaxAyuda, DialogoTerror, DialogoCienciaFiccion, DialogoRomance } from '@/data/dialogs';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'], // Define los pesos que quieras usar
});
export default function Historia() {
  const [cuento, setCuento] = useState({
    titulo: '',
    genero: '',
    contenido: ''
  });
 

  const [messages, setMessages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [storyText, setStoryText] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [contadorDeUsos, setContadorDeUsos] = useState(0);
  const genres = [
    { name: "Terror", image: "/images/genres/terror.png", bgImage: "/images/fondos/Terror1.webp" },
    { name: "Romance", image: "/images/genres/Romance.png", bgImage: "/images/fondos/Romance.jpg" },
    { name: "Aventura", image: "/images/genres/aventura.png", bgImage: "/images/fondos/aventura.jpg" },
    { name: "Ciencia Ficción", image: "/images/genres/ficcion.png", bgImage: "/images/fondos/ficcion.jpg" }
  ];
  const printableRef = useRef();
  useEffect(() => {
    const titulo = localStorage.getItem("titulo") || '';
    const genero = localStorage.getItem("genero") || '';
    const contenido = localStorage.getItem("contenido") || '';
    const contadorUsos = parseInt(localStorage.getItem("contador"), 10) || 0;
    setContadorDeUsos(contadorUsos);


    if (contenido != "") {
      setStoryText(contenido);
    }
    setCuento({ titulo, genero, contenido });

    const genreData = genres.find(g => g.name === genero);
    if (contadorDeUsos >= 5) {
      setMessages(

        MaxAyuda
      );
    } else if (genreData) {
      setBackgroundImage(genreData.bgImage);

      if (genreData.name === "Terror") {
        setMessages(
          DialogoTerror);
      } else if (genreData.name === "Aventura") {
        setMessages(

          DialogoAventura
        );
      } else if (genreData.name === "Ciencia Ficción") {
        setMessages(
          DialogoCienciaFiccion);
      } else if (genreData.name === "Romance") {
        setMessages(DialogoRomance);
      }
    }



  }, [contadorDeUsos]);
  const steps = [
    {
      selector: '#elemento1',
      content: 'Este es el botón de inicio, úsalo para comenzar.',
    },
    {
      selector: '#elemento2',
      content: 'Aquí puedes ver el menú de navegación.',
    },
    {
      selector: '#elemento3',
      content: 'Esta es la sección principal donde puedes ver el contenido.',
    },
  ];
  const handleStoryChange = (event) => {

    setStoryText(event.target.value);
    if (storyText.split(' ').length > 20) {
      setIsButtonEnabled(true);
    }

  };
  const SumarContador = () => {
    const newContador = contadorDeUsos + 1;
    setContadorDeUsos(newContador);
    localStorage.setItem("contador", newContador.toString());

  };

  const handleContinue = async () => {
    SumarContador();
    const data = {
      titulo: cuento.titulo,
      genero: cuento.genero,
      contenido: storyText
    }
    localStorage.setItem('contenido', storyText);
    try {
      const response = await sendHistoryToIa(data);
      if (response && response.data) {


        setStoryText(response.data);


      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleReescribir = async () => {


  };

  const handleImprimir = async () => {
    try {
      await convertirPdf(cuento, storyText);
    } catch (error) {
      console.error("Error al imprimir el PDF:", error);
    }
  };



  function handleBothFunctions(event) {
    handleStoryChange(event);
  }



  return (
    
      <div ref={printableRef}>

        {backgroundImage && (
          <div className='bg-black opacity-50'>
            <div className="fixed inset-0 -z-10 w-screen h-screen bg-opacity-50">
              <Image
                src={backgroundImage}
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          </div>
        )}

        <div className="h-screen relative z-10 bg-opacity-10">
          <Header />

          <div className="grid grid-cols-12 gap-4 py-12 px-4">

            <div className=" col-span-12 md:col-span-4 flex flex-col items-center space-y-4 ">
              <div className='mb-2'>
                <Burbuja messages={messages} />
              </div>
              <div>
                {cuento.genero === 'Terror' ? (
                  <DogTerror />

                ) : cuento.genero === 'Aventura' ? (

                  <DogAdventure />
                ) : cuento.genero === 'Ciencia Ficción' ? (
                  <DogFiccion />
                ) : cuento.genero === 'Romance' ? (
                  <DogLove />
                ) : (
                  <Dog />
                )}
              </div>

              <div className='mt-4'>
                <Button />
              </div>
            </div>




            <div className="col-span-12 md:col-span-8 flex flex-col items-center">

              <div  className="flex items-center justify-center mb-4 w-full">


                <div className="absolute m-4 right-0 w-16 h-16 flex items-center justify-center text-2xl font-bold bg-orange-500 rounded-full">
                  {contadorDeUsos}
                </div>
                {/* Título del cuento, centrado en el contenedor */}
                <h1 className={`${merriweather.className} text-2xl font-bold text-stone-300`}>
                  {cuento.titulo}
                </h1>
              </div>

              <textarea
                value={storyText}
                onChange={handleBothFunctions}
                className="w-full p-4 border rounded-lg h-64 text-black m-2"
                placeholder="Escribe aquí tu historia..."
              ></textarea>
              <div className="flex items-center justify-center mb-4 w-full">
                <button
                 
                  onClick={handleContinue}
                  disabled={!isButtonEnabled || contadorDeUsos >= 5}
                  className={`py-2 px-6 rounded ${isButtonEnabled || contadorDeUsos >= 5
                    ? 'bg-orange-600 hover:bg-orange-600 text-white mt-2'
                    : 'bg-orange-600 text-white-700 cursor-not-allowed mt-2'
                    }`}
                >
                  Continúa...
                </button>
                <button
                  onClick={handleImprimir}
                  disabled={!isButtonEnabled || contadorDeUsos >= 5}
                  className={`absolute m-4 right-0 py-2 px-6 rounded ${isButtonEnabled || contadorDeUsos >= 5
                    ? 'bg-orange-600 hover:bg-orange-600 text-white mt-4'
                    : 'bg-orange-600 text-white-700 cursor-not-allowed mt-4'
                    }`}
                >
                  Descargar
                </button>

                <button
                  onClick={handleReescribir}
                  disabled={!isButtonEnabled || contadorDeUsos >= 5}
                  className={`absolute m-4 right-36 py-2 px-6 rounded ${isButtonEnabled || contadorDeUsos >= 5
                    ? 'bg-orange-600 hover:bg-orange-600 text-white mt-4'
                    : 'bg-orange-600 text-white-700 cursor-not-allowed mt-4'
                    }`}
                >
                  Reescribir
                </button>
              </div>
            
            </div>

          </div>

        </div>

      </div>
    
  );
}
