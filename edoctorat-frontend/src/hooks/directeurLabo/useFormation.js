import { useQuery } from "@tanstack/react-query";
import {getFormations } from "../../api/directeurLaboApi/formation";


const PAGE_SIZE = 10;

/* =========================
   FETCH RECORDS (QUERY)
========================= */
export const useFormations = () => {
  return useQuery({
    queryKey: ["formations"],
    queryFn: () => getFormations(),
  });
};



