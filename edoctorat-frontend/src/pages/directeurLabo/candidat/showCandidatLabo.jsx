import { useParams } from "react-router-dom";

export default function ShowCandidatLabo() {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h5>Détails du candidat</h5>
      <p>ID candidat: {id}</p>
      {/* fetch full candidat info here */}
    </div>
  );
}
