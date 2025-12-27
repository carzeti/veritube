import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

function Login({ user, setUser }) {
  // Iniciar sesión
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error iniciando sesión:", error);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {user ? (
        <div>
          <p>Hola, {user.displayName}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión con Google</button>
      )}
    </div>
  );
}

export default Login;
