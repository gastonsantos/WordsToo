"use client"
import Link from 'next/link';
import Dog from "@/components/perro/dog";
import Burbuja from "@/components/burbuja-dialogo";
import Header from "@/components/header";
import Footer from "@/components/footer/footer";
import { Merriweather } from 'next/font/google';
import { empezarHistoria } from "@/services/historia/api";
import {DialogoInicio} from '@/data/dialogs';
import '@/styles/dog-style.css';
//import {getjwt} from '@/services/jwt/api';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400', '700'], // Define los pesos que quieras usar
});

const landing = () => {
    const messages = [
        DialogoInicio
    ];
    const handleEmpezar = async () => {
        await empezarHistoria();
       // await getjwt();
       
      };
      
    return (
        <div className='w-full min-h-screen bg-orange-500'>
        <section className="bg-orange-500 text-black-600 body-font text-md font-medium ">
            <Header />
            <div className="container px-5 py-5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 pb-6 w-full rounded-lg">
                    <div className="relative flex flex-col items-center space-y-16 mt-8">
                        <Burbuja messages={messages} />
                        <Dog />
                        <Link href="/pages/titulo"
                            className={`w-32 animate-bounceHorizontal focus:animate-none hover:animate-none mt-4 px-4 py-2 bg-orange-400 rounded-lg text-md font-medium text-white tracking-wide flex items-center justify-center`}>
                            <button
                                onClick={handleEmpezar}>
                                <span className={`${merriweather.className} ml-2`}>Comenzar</span>
                            </button>
                            <span>✏️</span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap mt-8 hidden md:block">
                    <div className="relative flex flex-col text-gray-700 border-gray-700 dark:border-white-700 dark:text-gray-400">
                        <div className=''>
                            <h1 className={`${merriweather.className} ml-2 font-bold text-xl text-white`}>Bienvenidos a WordsToo </h1>
                            <h5 className={`${merriweather.className} ml-64 font-bold text-xs text-white`}> La historia continúa...</h5>
                            <ul className="mt-8 flex flex-col space-y-2">
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true" className="mr-2 mb-8 h-auto w-6 text-blue-600 sm:w-7">
                                    <path strokeLinecap="round" strokeWidth="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                                    </path>
                                </svg>
                                    <p className={`${merriweather.className} ml-2 text-base text-slate-700 sm:text-lg`}>Elegí el título de tu historia</p>
                                </li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true" className="mr-2 mb-8 h-auto w-6 text-blue-600 sm:w-7">
                                    <path strokeLinecap="round" strokeWidth="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                                    </path>
                                </svg>
                                    <p className={`${merriweather.className} ml-2 text-base text-slate-700 sm:text-lg`}>Selecciona tu género favorito</p>
                                </li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true" className="mr-2 mb-8 h-auto w-6 text-blue-600 sm:w-7">
                                    <path strokeLinecap="round" strokeWidth="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                                    </path>
                                </svg>
                                    <p className={`${merriweather.className} ml-2 text-base text-slate-700 sm:text-lg`}>Empezala a escribir...</p>
                                </li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true" className="mr-2 mb-8 h-auto w-6 text-blue-600 sm:w-7">
                                    <path strokeLinecap="round" strokeWidth="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                                    </path>
                                </svg>
                                    <p className={`${merriweather.className} ml-2 text-base text-slate-700 sm:text-lg`}>Blue nuestra IA, te acompañara en el proceso</p>
                                </li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true" className="mr-2 mb-8 h-auto w-6 text-blue-600 sm:w-7">
                                    <path strokeLinecap="round" strokeWidth="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                                    </path>
                                </svg>
                                    <p className={`${merriweather.className} ml-2 text-base text-slate-700 sm:text-lg`}>Comparte o imprime cuando la termine</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
            <div className='bg-orange-500'>
                <Footer />
            </div>

        </section >
        </div>
    );
};

export default landing;
