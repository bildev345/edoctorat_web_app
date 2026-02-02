import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchExamination,
  createExamination,
  updateExamination,
} from "../../api/professeurApi/examinations";
import { useToast } from "../../context/ToastContext";

export const useGetExamination = (commissionId, sujetId, candidatId) =>
  useQuery({
    queryKey: ["prof", "examination", commissionId, sujetId, candidatId],
    queryFn: () => fetchExamination({ commissionId, sujetId, candidatId }),
    enabled: !!commissionId && !!sujetId && !!candidatId,
  });

export const useCreateExamination = (commissionId, sujetId, candidatId) => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (payload) => createExamination({ commissionId, sujetId, candidatId, payload }),
    onSuccess: () => {
      showToast("Examination créée ✅");
      qc.invalidateQueries({ queryKey: ["prof", "examination", commissionId, sujetId, candidatId] });
      qc.invalidateQueries({ queryKey: ["prof", "commissions", commissionId, "sujets", sujetId, "candidats"] });
    },
    onError: (err) => {
      showToast(err?.response?.data?.message || "Erreur création examination", "danger");
    },
  });
};

export const useUpdateExamination = (commissionId, sujetId, candidatId) => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (payload) => updateExamination({ commissionId, sujetId, candidatId, payload }),
    onSuccess: () => {
      showToast("Examination mise à jour ✅");
      qc.invalidateQueries({ queryKey: ["prof", "examination", commissionId, sujetId, candidatId] });
      qc.invalidateQueries({ queryKey: ["prof", "commissions", commissionId, "sujets", sujetId, "candidats"] });
    },
    onError: (err) => {
      showToast(err?.response?.data?.message || "Erreur update examination", "danger");
    },
  });
};
