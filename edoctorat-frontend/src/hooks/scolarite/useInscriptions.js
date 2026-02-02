import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchInscriptions,
  createInscription,
  updateInscription,
  deleteInscription,
} from "../../api/scolariteApi/inscriptions";
import { useToast } from "../../context/ToastContext";

export const SCOL_INSCRIPTIONS_QK = ["scolarite", "inscriptions"];

export const useScolariteInscriptions = () =>
  useQuery({
    queryKey: SCOL_INSCRIPTIONS_QK,
    queryFn: fetchInscriptions,
    staleTime: 5 * 60 * 1000,
  });

export const useCreateInscription = () => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createInscription,
    onSuccess: () => {
      showToast("Inscription ajoutée ✅", "success");
      qc.invalidateQueries({ queryKey: SCOL_INSCRIPTIONS_QK });
    },
    onError: (err) => {
      showToast(err?.response?.data?.message || err?.message || "Erreur ajout", "danger");
    },
  });
};

export const useUpdateInscription = () => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateInscription,
    onSuccess: () => {
      showToast("Inscription mise à jour ✅", "success");
      qc.invalidateQueries({ queryKey: SCOL_INSCRIPTIONS_QK });
    },
    onError: (err) => {
      showToast(err?.response?.data?.message || err?.message || "Erreur modification", "danger");
    },
  });
};

export const useDeleteInscription = () => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: deleteInscription,
    onSuccess: () => {
      showToast("Inscription supprimée ✅", "success");
      qc.invalidateQueries({ queryKey: SCOL_INSCRIPTIONS_QK });
    },
    onError: (err) => {
      showToast(err?.response?.data?.message || err?.message || "Erreur suppression", "danger");
    },
  });
};
