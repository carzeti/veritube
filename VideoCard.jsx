import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

function VideoCard({ videoId, title, channel, user }) {
  const [votes, setVotes] = useState({ verdadero: 0, falso: 0, parcial: 0 });
  const [userVote, setUserVote] = useState(null);

  const votesCollection = collection(db, "votes");

  // Cargar votos actuales y voto del usuario
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

  // Guardar voto
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
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginTop: "20px" }}>
      <h2>{title}</h2>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      ></iframe>
      <p>Video de {channel}</p>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleVote("verdadero")} disabled={!!userVote}>✔ Verdadero</button>
        <button onClick={() => handleVote("falso")} disabled={!!userVote}>✖ Falso</button>
        <button onClick={() => handleVote("parcial")} disabled={!!userVote}>⚠ Parcial</button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <p>✔ Verdadero: {percent(votes.verdadero)}%</p>
        <p>✖ Falso: {percent(votes.falso)}%</p>
        <p>⚠ Parcial: {percent(votes.parcial)}%</p>
      </div>
    </div>
  );
}

export default VideoCard;

