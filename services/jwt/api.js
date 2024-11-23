import axios from 'axios'; // Asegúrate de importar axios correctamente
//import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { API_BACK } from "@/config/constants";


const getjwt = async () => {
    console.log("Entra al getjwt");
    try {
            const response = await axios.get("https://wordstoo-back.onrender.com/api/jwt/generar-token", {
            //const response = await axios.get("http://localhost:8000/api/jwt/generar-token", {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (response.data != null) {
            console.log("No es null",response.data );
            
            // Obtener el token del usuario de los datos
            const token = response.data;
            console.log(response.data);
            
            //crea la cookie
            const expiracion = new Date(new Date().getTime() + 1000 * 60 * 60 * 10); 
            Cookies.set("token", token, { expires: expiracion });

            //const decode = jwtDecode(token);
            
     

       // Guardar información en localStorage solo en el navegador
       if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
     
    }


        } else {
            console.error('No se encontró el token en la respuesta del servidor');
        }

        return response.data; // Puedes retornar más información si es necesario

    } catch (error) {
        throw error;
    }
}




export { getjwt }
 