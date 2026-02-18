import { useState } from "react";
import { useInscrits } from "../../../hooks/directeurLabo/useInscritsLabo";
import InscritsTable from "../../../components/directeurLabo/candidatInscritsLabo";
import Pagination from "../../../components/myPagination";

export default function InscritsPage() {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isLoading } = useInscrits({ page, size });

  return (
    <>
      <InscritsTable data={data?.data} isLoading={isLoading} />

      <Pagination
        page={page}
        totalPages={data?.totalPages || 0}
        onPageChange={setPage}
      />
    </>
  );
}
