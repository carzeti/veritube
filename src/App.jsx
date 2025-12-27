import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import VideoFeed from "./components/VideoFeed";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>VeriTube</h1>
      <Login user={user} setUser={setUser} />

      {/* Feed de videos */}
      <VideoFeed user={user} />
    </div>
  );
}

export default App;
