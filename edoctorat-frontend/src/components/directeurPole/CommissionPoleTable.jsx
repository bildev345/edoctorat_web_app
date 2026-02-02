import { Table, Spinner } from "react-bootstrap";
import { useCommissionsPole } from "../../hooks/directeurPole/useCommissionsPole";

export default function CommissionsPoleTable({ page }) {
  const { data, isLoading } = useCommissionsPole(page);

  if (isLoading) return <Spinner animation="border" />;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Heure</th>
          <th>Lieu</th>
          <th>Sujets</th>
          <th>Membres</th>
          <th>Labo</th>
          <th>CED</th>
        </tr>
      </thead>
      <tbody>
        {data.content.map(row => (
          <tr key={row.id}>
            <td>{row.date}</td>
            <td>{row.heure}</td>
            <td>{row.lieu}</td>
            <td>{row.sujets.join(", ")}</td>
            <td>{row.membres.join(", ")}</td>
            <td>{row.laboratoire}</td>
            <td>{row.ced}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
