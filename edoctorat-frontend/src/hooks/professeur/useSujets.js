import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSujet, deleteSujet, fetchSujets, updateSujet } from "../../api/professeurApi/sujets";
import { useToast } from "../../context/ToastContext";

export const SUJETS_QK = ["prof", "sujets"];

export const useSujets = () =>
  useQuery({
    queryKey: SUJETS_QK,
    queryFn: fetchSujets,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

export const useCreateSujet = () => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createSujet,

    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: SUJETS_QK });
      const prev = qc.getQueryData(SUJETS_QK);

      // ✅ SujetDTO utilise sujetId
      const optimistic = {
        sujetId: `tmp-${Date.now()}`,
        ...payload,
        titreFormationDoctoral: payload?.titreFormationDoctoral ?? "",
      };

      qc.setQueryData(SUJETS_QK, (old = []) => [optimistic, ...old]);
      return { prev };
    },

    onError: (err, _payload, ctx) => {
      qc.setQueryData(SUJETS_QK, ctx?.prev);
      showToast(err?.response?.data?.message || "Création échouée", "danger");
    },

    onSuccess: () => {
      showToast("Sujet ajouté", "success");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: SUJETS_QK });
    },
  });
};

export const useUpdateSujet = () => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateSujet,

    onMutate: async ({ sujetId, payload }) => {
      await qc.cancelQueries({ queryKey: SUJETS_QK });
      const prev = qc.getQueryData(SUJETS_QK);

      qc.setQueryData(SUJETS_QK, (old = []) =>
        old.map((s) => (String(s.sujetId) === String(sujetId) ? { ...s, ...payload } : s))
      );

      return { prev };
    },

    onError: (err, _vars, ctx) => {
      qc.setQueryData(SUJETS_QK, ctx?.prev);
      showToast(err?.response?.data?.message || "Modification échouée", "danger");
    },

    onSuccess: () => {
      showToast("Sujet modifié", "success");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: SUJETS_QK });
    },
  });
};

export const useDeleteSujet = () => {
  const qc = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: deleteSujet,

    onMutate: async (sujetId) => {
      await qc.cancelQueries({ queryKey: SUJETS_QK });
      const prev = qc.getQueryData(SUJETS_QK);

      qc.setQueryData(SUJETS_QK, (old = []) =>
        old.filter((s) => String(s.sujetId) !== String(sujetId))
      );

      return { prev };
    },

    onError: (err, _id, ctx) => {
      qc.setQueryData(SUJETS_QK, ctx?.prev);
      showToast(err?.response?.data?.message || "Suppression échouée", "danger");
    },

    onSuccess: () => {
      showToast("Sujet supprimé", "success");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: SUJETS_QK });
    },
  });
};
