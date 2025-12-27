import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import VideoCard from "./components/VideoCard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>VeriTube</h1>
      <Login user={user} setUser={setUser} />

      <VideoCard
        videoId="dQw4w9WgXcQ"
        title="¿Este video dice la verdad?"
        channel="Canal Ejemplo"
        user={user}
      />
    </div>
  );
}

export default App;
