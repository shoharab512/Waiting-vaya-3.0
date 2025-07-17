"use client";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "@/components/ui/pagination";
import {
  setPage,
  setSolverProblemArisePage,
  setSolverProblemSolvePage,
  setStudentPage,
} from "@/redux/problemSlice";

const Pagination = ({
  page,
  dispatch,
  totalPages,
  role,
}: {
  page: any;
  dispatch: any;
  totalPages: any;
  role: any;
}) => {
  const handlePageChange = (e: number) => {
    console.log(page, " ", totalPages, " ", role, " ", totalPages);
    if (e > 0 && e <= totalPages && e !== page) {
      {
        role === "student" ? dispatch(setStudentPage(e)) : "";
      }
      {
        role === "public" ? dispatch(setPage(e)) : "";
      }
      {
        role === "ProblemArise" ? dispatch(setSolverProblemArisePage(e)) : "";
      }
      {
        role === "SolverSolve" ? dispatch(setSolverProblemSolvePage(e)) : "";
      }
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`cursor-pointer px-3 py-1 rounded ${
                page === i ? "bg-teal-800 text-white" : ""
              }`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page, current page, last page with ellipsis
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className={`cursor-pointer px-3 py-1 rounded ${
              page === 1 ? "bg-teal-800 text-white" : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <span className="px-2">...</span>
          </PaginationItem>
        );
      }

      if (page > 1 && page < totalPages) {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
              className={`cursor-pointer px-3 py-1 rounded ${
                page === page ? "bg-teal-800 text-white" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <span className="px-2">...</span>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={`cursor-pointer px-3 py-1 rounded ${
              page === totalPages ? "bg-teal-800 text-white" : ""
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <UIPagination className="p-1 mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handlePageChange(page - 1)}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => handlePageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default Pagination;
