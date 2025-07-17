"use client";

import GetProblemArise from "@/ApiCall/GetProblemArise";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectAriseProblems,
  selectCount,
  selectDelete,
  selectSolverProblemArisePage,
  selectSolverProblemAriseTotalPages,
} from "@/redux/problemSlice";
import { useEffect } from "react";
import Pagination from "../Pagination";
import SingleProblem from "../SingleProblem";
const ProblemAriseThings = ({ session }: { session: any }) => {
  const page = useAppSelector(selectSolverProblemArisePage);
  const countproblem = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const ariseProblems = useAppSelector(selectAriseProblems);
  const totalPages = useAppSelector(selectSolverProblemAriseTotalPages);
  const countDelete = useAppSelector(selectDelete);
  const role = "ProblemArise";
  // Arise Problems
  useEffect(() => {
    const fetchData = async () => {
      await GetProblemArise(page, dispatch);
    };
    fetchData();
  }, [page, countDelete, countproblem, dispatch]);
  return (
    <>
      {ariseProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ariseProblems.map((item: any, index: number) => (
            <SingleProblem session={session} item={item} key={index} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">No problems found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters or add new problems.
            </p>
          </CardContent>
        </Card>
      )}
      <Pagination
        role={role}
        page={page}
        totalPages={totalPages}
        dispatch={dispatch}
      />
    </>
  );
};
export default ProblemAriseThings;
