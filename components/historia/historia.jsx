"use client";
import { useEffect, useState, useRef } from 'react';
import DogFiccion from "@/components/perro/dog-ficcion";
import DogLove from "@/components/perro/dog-love";
import DogTerror from "@/components/perro/dog-terror";
import DogAdventure from "@/components/perro/dog-adventure";
import Dog from "@/components/perro/dog";
import Burbuja from "@/components/burbuja-dialogo";
import Header from "@/components/header";
import Button from "@/components/button/back";
import Image from "next/image";
import { sendHistoryToIa, convertirPdf, mejoraHistoria } from "@/services/historia/api";
import { Merriweather } from 'next/font/google';
import { DialogoAventura, MaxAyuda, DialogoTerror, DialogoCienciaFiccion, DialogoRomance } from '@/data/dialogs';
import { useTour } from '@reactour/tour'
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400', '700'], // Define los pesos que quieras usar
});


export default function Historia() {

    const { setIsOpen } = useTour()

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
        
        setStoryText("");
        SumarContador();

        const data = {
            titulo: cuento.titulo,
            genero: cuento.genero,
            contenido: storyText
        };

        localStorage.removeItem('contenido');

        try {
            const response = await mejoraHistoria(data);
            if (response && response.data) {
                console.log("Historia", response.data);
                setStoryText(response.data);
            }
        } catch (error) {
            console.log("Error", error);
        }
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
        /* <div className="demo">*/

        <div ref={printableRef} className=''>
            <div className="">
                {backgroundImage && (
                    <div className=''>
                        <div className="fixed inset-0 -z-10 w-screen h-screen ">
                            <Image
                                src={backgroundImage}
                                alt="Background Image"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                                className=''
                            />
                        </div>

                    </div>
                    
                )}
            </div>
            <div className="h-screen relative z-10 bg-opacity-10">
                <Header />

                <div className="grid grid-cols-12 gap-4 py-12 px-4">


                    <div className=" first-step col-span-12 md:col-span-4 flex flex-col items-center space-y-4 ">
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

                        <div className="flex items-center justify-between mb-4 w-full">
                            {/* Botón de Tour (Izquierda) */}
                            <button
                                className=" left-0 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => setIsOpen(true)}
                            >
                                Ayuda
                            </button>

                            {/* Título del cuento (Centro) */}
                            <div className='bg-black opacity-70 p-4 rounded-lg'>
                            <h1 className={`${merriweather.className} text-2xl font-bold text-stone-100 text-center items-center`}>
                                {cuento.titulo}
                            </h1>
                            </div>
                            {/* Contador de Ayudas (Derecha) */}
                            <div className="six-step right-0 m-4 w-16 h-16 flex items-center justify-center text-2xl text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-full  px-5 py-2.5 text-center me-2 mb-2">
                                {contadorDeUsos}
                            </div>


                        </div>

                        {/* Caja de texto para escribir la historia */}
                        <textarea
                            value={storyText}
                            onChange={handleBothFunctions}
                            className="second-step w-full p-4 border rounded-lg h-64 text-black m-2"
                            placeholder="Escribe aquí tu historia..."
                        ></textarea>

                        {/* Contenedor de botones debajo del área de texto */}
                        <div className="flex items-center justify-between mb-4 w-full">
                            {/* Botón Continúa (Izquierda) */}
                            <button
                                onClick={handleContinue}
                                disabled={!isButtonEnabled || contadorDeUsos >= 5}
                                className={`third-step py-2 px-6 rounded ${isButtonEnabled || contadorDeUsos >= 5
                                    ? 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                    : 'text-white cursor-not-allowed bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                    }`}
                            >
                                Continúa...
                            </button>

                            {/* Botón Reescribir (Centro) */}
                            <button
                                onClick={handleReescribir}
                                disabled={!isButtonEnabled || contadorDeUsos >= 5}
                                className={`four-step py-2 px-6 rounded ${isButtonEnabled || contadorDeUsos >= 5
                                    ? 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                    : 'text-white cursor-not-allowed bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                    }`}
                            >
                                Reescribir
                            </button>

                            {/* Botón Descargar (Derecha) */}
                            <button
                                onClick={handleImprimir}
                                disabled={!isButtonEnabled || contadorDeUsos >= 5}
                                className={`five-step py-2 px-6 rounded ${isButtonEnabled || contadorDeUsos >= 5
                                    ? 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                    : 'text-white cursor-not-allowed bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                    }`}
                            >
                                Descargar
                            </button>
                        </div>

                    </div>


                </div>

            </div>

        </div>
        /*</div>*/
    )
}