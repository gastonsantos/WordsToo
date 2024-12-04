"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dog from "@/components/perro/dog";
import Burbuja from "@/components/burbuja-dialogo";
import Header from "@/components/header";
import { Merriweather } from "next/font/google";
import { empezarHistoria } from "@/services/historia/api";
import "@/styles/dog-style.css";
import { DialogLanding } from "@/data/dialogs";
import { pasos } from "@/data/pasos";

// Extiende el tipo WindowEventMap para incluir "beforeinstallprompt"
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// Define el tipo para BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Landing = () => {
  const router = useRouter();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setInstallPrompt(event);
      setShowInstallButton(true);
    };

    // Escucha el evento `beforeinstallprompt`
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleEmpezar = async () => {
    try {
      await empezarHistoria();
      router.push("/pages/titulo");
    } catch (error) {
      console.error("Error al iniciar la historia:", error);
    }
  };

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === "accepted") {
        console.log("PWA instalada exitosamente");
      } else {
        console.log("Instalación de PWA rechazada");
      }
      setInstallPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <section className="text-black-600 body-font text-md font-medium">
        <Header />
        <div className="container px-5 py-5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 pb-6 w-full rounded-lg">
            <div className="relative flex flex-col items-center space-y-16 mt-8">
              <Burbuja messages={DialogLanding} />
              <Dog />
              <div className="flex space-x-4">
                <button
                  onClick={handleEmpezar}
                  className="w-32 animate-bounceHorizontal mt-4 px-4 py-2 bg-orange-400 rounded-lg text-md font-medium text-white tracking-wide flex items-center justify-center"
                >
                  <span className={`${merriweather.className} ml-2`}>Comenzar</span>
                  <span>✏️</span>
                </button>
                {showInstallButton && (
                  <button
                    onClick={handleInstall}
                    className="w-32 px-4 py-2 bg-green-400 rounded-lg text-md font-medium text-white tracking-wide flex items-center justify-center"
                  >
                    <span className={`${merriweather.className} ml-2`}>Descargar</span>
                    <span>📥</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap mt-8 hidden md:block">
            <h1 className={`${merriweather.className} text-white text-xl`}>Bienvenidos a WordsToo</h1>
            <ul className="mt-8 flex flex-col space-y-2">
              {pasos.map((paso, index) => (
                <li key={index} className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-2 mb-8 h-auto w-6 text-blue-300 sm:w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                  <p className={`${merriweather.className} text-white`}>{paso.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
