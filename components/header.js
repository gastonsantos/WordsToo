// components/Header.js
import { Merriweather } from 'next/font/google';
import React from "react";
import DogHeader from "@/components/perro/dog-header";
import Link from 'next/link'
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'], // Define los pesos que quieras usar
});

const Header = () => {
  return (

    <header className="flex items-center justify-center bg-white  space-x-4">
      <Link href="/">
      <h1 className={`${merriweather.className} relative text-black font-mono text-2xl before:absolute before:inset-0 before:animate-typewriter before:bg-white after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-black`}>
        WordsToo...
      </h1>
      </Link>
      <div className='pl-10'>
      <DogHeader />
      </div>
      
    </header>

  );
};

export default Header;
