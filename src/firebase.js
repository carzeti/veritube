// Importa las funciones que necesitamos de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCv82J5kQ_9w1NlyL_VTUWQ8yzSWPmEkYo",
  authDomain: "veritube-a6d5c.firebaseapp.com",
  projectId: "veritube-a6d5c",
  storageBucket: "veritube-a6d5c.appspot.com",
  messagingSenderId: "728082814598",
  appId: "1:728082814598:web:98ca739c76aea1c4a92307"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Auth y Firestore para usar en el proyecto
export const auth = getAuth(app);
export const db = getFirestore(app);
