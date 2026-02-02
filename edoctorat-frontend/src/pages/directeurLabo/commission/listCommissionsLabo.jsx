import { useState } from "react";
import CommissionFormModal from "../../../components/directeurLabo/commissionFormModal";
import CommissionTable from "../../../components/directeurLabo/commissionsTable";
import {
  useCommissions,
  useCreateCommission,
  useUpdateCommission,
  useDeleteCommission
} from "../../../hooks/directeurLabo/useCommissions";
import {useProfs} from "../../../hooks/directeurLabo/useProf";
import { useSujetsLaboList } from "../../../hooks/directeurLabo/useSujet";

export default function CommissionsPage() {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading, isError } = useCommissions(page);
  const createMutation = useCreateCommission();
  const updateMutation = useUpdateCommission();
  const deleteMutation = useDeleteCommission();
  const {data : profsData} = useProfs();
  const {data : sujetsListData} = useSujetsLaboList();

  console.log("profs data: ", profsData);
  console.log("sujetsListData", sujetsListData);

  const commissions = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 0;


  const handleCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleEdit = (commission) => {
    setEditing(commission);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Supprimer cette commission ?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (form) => {
    if (editing) {
      updateMutation.mutate({
        id: editing.id,
        payload: form,
      });
    } else {
      createMutation.mutate(form);
    }
    setShowModal(false);
  };

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Commissions</h3>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nouvelle commission
        </button>
      </div>

      <CommissionTable
        data={commissions.map((c) => ({
          id: c.commissionId,
          dateCommission: c.dateCommission,
          heureCommission: c.heure,
          lieu: c.lieu,
          sujets: c.sujetsTitres ?? [],
          membres: c.membresNames ?? [],
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="d-flex justify-content-center gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          ◀
        </button>
        <span>
          Page {page + 1} / {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          ▶
        </button>
      </div>

      {showModal && (
        <CommissionFormModal
          initialData={editing}
          sujets={profsData} 
          profs={sujetsListData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
