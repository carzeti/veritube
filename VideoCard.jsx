import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, setDoc, getDocs, query, where, doc } from "firebase/firestore";

function VideoCard({ videoId, title, channel, description, user }) {
  const [votes, setVotes] = useState({ verdadero: 0, falso: 0, parcial: 0 });
  const [userVote, setUserVote] = useState(null);
  const votesCollection = collection(db, "votes");

  useEffect(() => {
    const fetchVotes = async () => {
      const q = query(votesCollection, where("videoId", "==", videoId));
      const querySnapshot = await getDocs(q);
      const voteCounts = { verdadero: 0, falso: 0, parcial: 0 };
      let voted = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        voteCounts[data.vote] += 1;
        if (user && data.userId === user.uid) {
          voted = data.vote;
        }
      });

      setVotes(voteCounts);
      setUserVote(voted);
    };

    fetchVotes();
  }, [videoId, user]);

  const handleVote = async (voteType) => {
    if (!user) {
      alert("Debes iniciar sesión para votar");
      return;
    }
    if (userVote) {
      alert("Ya votaste en este video");
      return;
    }

    await setDoc(doc(db, "votes", `${videoId}_${user.uid}`), {
      videoId,
      userId: user.uid,
      vote: voteType,
    });

    setUserVote(voteType);
    setVotes({ ...votes, [voteType]: votes[voteType] + 1 });
  };

  const totalVotes = votes.verdadero + votes.falso + votes.parcial;
  const percent = (v) => (totalVotes === 0 ? 0 : Math.round((v / totalVotes) * 100));

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2>{title}</h2>
      <p style={{ fontStyle: "italic", color: "#555" }}>{channel}</p>
      {description && <p>{description}</p>}

      <iframe
        width="100%"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      ></iframe>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleVote("verdadero")} disabled={!!userVote}>✔ Verdadero</button>
        <button onClick={() => handleVote("falso")} disabled={!!userVote}>✖ Falso</button>
        <button onClick={() => handleVote("parcial")} disabled={!!userVote}>⚠ Parcial</button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <p>Total de votos: {totalVotes}</p>
        <div style={{ marginBottom: "5px" }}>✔ Verdadero: {percent(votes.verdadero)}%
          <div style={{ background: "#eee", width: "100%", height: "10px", borderRadius: "5px", marginTop: "2px" }}>
            <div style={{ width: `${percent(votes.verdadero)}%`, height: "100%", background: "green", borderRadius: "5px" }}></div>
          </div>
        </div>
        <div style={{ marginBottom: "5px" }}>✖ Falso: {percent(votes.falso)}%
          <div style={{ background: "#eee", width: "100%", height: "10px", borderRadius: "5px", marginTop: "2px" }}>
            <div style={{ width: `${percent(votes.falso)}%`, height: "100%", background: "red", borderRadius: "5px" }}></div>
          </div>
        </div>
        <div style={{ marginBottom: "5px" }}>⚠ Parcial: {percent(votes.parcial)}%
          <div style={{ background: "#eee", width: "100%", height: "10px", borderRadius: "5px", marginTop: "2px" }}>
            <div style={{ width: `${percent(votes.parcial)}%`, height: "100%", background: "orange", borderRadius: "5px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;

              height: "100%",
              bac

