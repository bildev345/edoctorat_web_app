import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

import { useSendNotifications } from "../../../hooks/directeurLabo/useNotifications";
import { useCommissions } from "../../../hooks/directeurLabo/useCommissions";
import SujetCandidatsModal from "../../../components/directeurLabo/sujetCandidatsModal";
import ConfirmSendModal from "../../../components/directeurLabo/confirmSendModal";
const PAGE_SIZE = 5;

export default function CommissionsNotificationsPage() {
  const [page, setPage] = useState(0);
  const [currentCommission, setCurrentCommission] = useState(null);
  const [currentSujet, setCurrentSujet] = useState(null);
  const [showSujetModal, setShowSujetModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [payload, setPayload] = useState({
    commissionId: null,
    type: "CONVOCATION",
    sujetsCandidats: [],
  });

  const { data } = useCommissions(page, PAGE_SIZE);
  const sendMutation = useSendNotifications();
  /*
  const commissions = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? [];
  */
  const handleSujetConfirm = (candidatIds) => {
    setPayload((prev) => ({
      ...prev,
      commissionId: currentCommission.id,
      sujetsCandidats: [
        ...prev.sujetsCandidats.filter(
          (s) => s.sujetId !== currentSujet.id
        ),
        {
          sujetId: currentSujet.id,
          candidatIds,
        },
      ],
    }));
    setShowSujetModal(false);
  };

  const handleSend = async () => {
    try {
      await sendMutation.mutateAsync(payload);
      toast.success("Notifications envoyées");
      setPayload({ commissionId: null, type: "CONVOCATION", sujetsCandidats: [] });
      setShowConfirm(false);
    } catch {
      toast.error("Erreur lors de l’envoi");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Commissions</h4>

      <Table bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lieu</th>
            <th>Heure</th>
            <th>Sujets</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.content.map((c) => (
            <tr key={c.id}>
              <td>{c.dateCommission}</td>
              <td>{c.lieu}</td>
              <td>{c.heure}</td>
              <td>
                {c.sujetsTitres.map((s) => (
                  <Button
                    key={s.id}
                    variant="link"
                    onClick={() => {
                      setCurrentCommission(c);
                      setCurrentSujet(s);
                      setShowSujetModal(true);
                    }}
                  >
                    {s}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        disabled={payload.sujetsCandidats.length === 0}
        onClick={() => setShowConfirm(true)}
      >
        Envoyer notifications
      </Button>

      <SujetCandidatsModal
        show={showSujetModal}
        sujet={currentSujet}
        candidats={currentSujet?.candidats || []}
        onClose={() => setShowSujetModal(false)}
        onConfirm={handleSujetConfirm}
      />

      <ConfirmSendModal
        show={showConfirm}
        loading={sendMutation.isLoading}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleSend}
      />
    </div>
  );
}
