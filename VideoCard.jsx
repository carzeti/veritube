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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>VeriTube</h1>
      <Login user={user} setUser={setUser} />

      {/* Feed de videos */}
      <VideoFeed user={user} />
    </div>
  );
}


