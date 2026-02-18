import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getSujets,
  ajouterSujet
} from "../../api/directeurLaboApi/sujetLabo.js";
import { useToast } from "../../context/ToastContext.jsx";
import { getSujetsLaboList } from "../../api/directeurLaboApi/sujetsLaboList.js";

const PAGE_SIZE = 10;

/* =========================
   FETCH RECORDS (QUERY)
========================= */
export const useSujetsLabo = (page, filter = "") => {
  return useQuery({
    queryKey: ["sujetsLabo", page, filter],
    queryFn: () =>
      getSujets({
        page,
        size: PAGE_SIZE,
        name: filter, // Pass filter as 'name' to match backend parameter
      }),
    // React Query v5 syntax
    placeholderData: keepPreviousData, 
    staleTime: 5 * 60 * 1000,
  });
};

export const useSujetsLaboList = () => {
  return useQuery({
    queryKey: ["sujetsLaboList"],
    queryFn: () => getSujetsLaboList()
  });
};

/* =========================
   CREATE RECORD
========================= */
export const useCreateSujet = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ajouterSujet,
    onSuccess: () => {
      showToast("Sujet ajouté avec succès");
      // Refresh the list
      queryClient.invalidateQueries({ queryKey: ["sujetsLabo"] });
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Erreur lors de l'ajout",
        "danger"
      );
    },
  });
};

/* =========================
   UPDATE RECORD
========================= */
/*export const useUpdateSujet = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    // mutationFn expects an object: { id, payload }
    mutationFn: modifierSujet, 

    onSuccess: () => {
      showToast("Sujet modifié avec succès");
      queryClient.invalidateQueries({ queryKey: ["sujetsLabo"] });
    },

    onError: (error) => {
      showToast(
         error.response?.data?.message || "Erreur lors de la modification", 
         "danger"
      );
    },
  });
};*/

/* =========================
   DELETE RECORD
========================= */
/*export const useDeleteSujet = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: supprimerSujet, // Expects ID

    onSuccess: () => {
      showToast("Sujet supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ["sujetsLabo"] });
    },

    onError: (error) => {
      showToast(
        error.response?.data?.message || "Erreur lors de la suppression", 
        "danger"
      );
    },
  });
};*/