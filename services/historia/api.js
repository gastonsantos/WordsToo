import { API } from "@/config/constants";
import axios from 'axios';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

async function sendHistoryToIa(data){
  console.log("API URL:", API); // Esto debe mostrar "https://wordstoo-back.onrender.com"

    try {
     // const response = await axios.post("https://wordstoo-back.onrender.com/api/cohere/continuarHistoria", data);
      const response = await axios.post(API+'/api/cohere/continuarHistoria', data);
      if (response.data != null) {
        console.log(response);
        localStorage.setItem("contenido",response.data)
          return response;
      }
  } catch (error) {
      throw error; 
  }
  }
  
  

  async function mejoraHistoria(data){
    try {
      //const response = await axios.post("https://wordstoo-back.onrender.com/api/cohere/mejorarHistoria", data);
      const response = await axios.post(API+'/api/cohere/mejorarHistoria', data);
      
      if (response.data != null) {
        console.log(response);
        localStorage.setItem("contenido",response.data)
          return response;
      }
  } catch (error) {
      throw error; 
  }
  }
  async function empezarHistoria() {
    localStorage.removeItem("contador");
    localStorage.removeItem("contenido");
    localStorage.removeItem("genero");
    localStorage.removeItem("titulo");
  }

  async function convertirPdf(cuento, storyText){
    if (typeof window !== "undefined") {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      try {
        // Cargar el logo desde la carpeta pública
        const logoSrc = "/images/icons/Blue-No fondo.png"; // Ruta del logo en la carpeta pública
        const response = await fetch(logoSrc);
        const blob = await response.blob();
        const reader = new FileReader();
  
        reader.readAsDataURL(blob);
        return new Promise((resolve, reject) => {
          reader.onloadend = async () => {
            const logoDataUrl = reader.result;
  
            // Elemento a imprimir
            const printableElement = document.querySelector(".h-screen");
            if (printableElement) {
              const canvas = await html2canvas(printableElement, { useCORS: true });
              const imgData = canvas.toDataURL("image/jpeg", 1.0);
  
              // Fondo de la imagen en el PDF
              pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
  
              // Capa negra semitransparente
              pdf.setGState(new pdf.GState({ opacity: 0.5 }));
              pdf.setFillColor(0, 0, 0);
              pdf.rect(0, 0, pageWidth, pageHeight, "F");
              pdf.setGState(new pdf.GState({ opacity: 1 }));
  
              // Agregar el logo
              pdf.addImage(logoDataUrl, "PNG", 10, 10, 30, 30);
  
              // Título en blanco y centrado
              pdf.setFontSize(30);
              pdf.setTextColor(255, 255, 255);
              pdf.text(cuento.titulo, pageWidth / 2, 30, { align: "center" });
  
              // Fondo blanco para el texto de la historia
              const textStartX = 20;
              const textStartY = 50;
              const textWidth = pageWidth - 40;
              const textHeight = pageHeight - 70;
              const cornerRadius = 10;
  
              pdf.setGState(new pdf.GState({ opacity: 0.9 }));
              pdf.setFillColor(255, 255, 255);
              pdf.roundedRect(textStartX, textStartY, textWidth, textHeight, cornerRadius, cornerRadius, "F");
              pdf.setGState(new pdf.GState({ opacity: 1 }));
  
              // Texto de la historia
              pdf.setFontSize(12);
              pdf.setTextColor(0, 0, 0);
              pdf.text(storyText, textStartX + 5, textStartY + 10, { maxWidth: textWidth - 10 });
  
              // Guardar el PDF
              pdf.save(`${cuento.titulo || "Historia"}.pdf`);
              resolve();
            } else {
              console.error("Elemento para imprimir no encontrado.");
              reject(new Error("Elemento para imprimir no encontrado."));
            }
          };
        });
      } catch (error) {
        console.error("Error al generar el PDF:", error);
      }
    }

  }
  export {sendHistoryToIa,empezarHistoria,convertirPdf,mejoraHistoria }
