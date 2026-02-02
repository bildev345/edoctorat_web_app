import { useQuery } from "@tanstack/react-query";
import {getProfs} from "../../api/directeurLaboApi/prof";
const PAGE_SIZE = 10;

/* =========================
   FETCH RECORDS (QUERY)
========================= */
export const useProfs = () => {
  return useQuery({
    queryKey: ["profs"],
    queryFn: () => getProfs()
  });
};



