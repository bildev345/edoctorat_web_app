import { useState } from "react";
//import { usePostules } from "../../../hooks/usePostules";
import {usePostules} from "../../../hooks/directeurLabo/usePostules";
import PostulesTable from "../../../components/directeurLabo/postulesTable";
import Pagination from "../../../components/myPagination";

export default function PostulesPage() {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isLoading, isError } = usePostules({ page, size });

  if (isError) {
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement des candidatures
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Candidats postulés</h4>

      <PostulesTable data={data} isLoading={isLoading} />

      <Pagination
        page={page}
        totalPages={data?.totalPages || 0}
        onPageChange={setPage}
      />
    </div>
  );
}
