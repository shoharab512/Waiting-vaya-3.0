"use client";

import GetAllProblems from "@/ApiCall/GetAllProblems";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCount,
  selectDelete,
  selectPage,
  selectProblem,
  selectTotalPages,
} from "@/redux/problemSlice";
import { useEffect } from "react";
import SingleProblem from "../SingleProblem";
import Pagination from "../Pagination";

const AdminThings = ({ session }: { session: any }) => {
  const dispatch = useAppDispatch();
  const countDelete = useAppSelector(selectDelete);
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);
  const countproblem = useAppSelector(selectCount);
  const allProblems = useAppSelector(selectProblem);
  
  const role = "public";
  // all Problems
  useEffect(() => {
    const fetchData = async () => {
      await GetAllProblems(page, dispatch);
    };
    fetchData();
  }, [page, countDelete, countproblem, dispatch]);
  return (
    <>
      {allProblems.length > 0 ? (
        <div className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProblems.map((item: any, index: number) => (
              <SingleProblem session={session} item={item} key={index} />
            ))}
          </div>
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
export default AdminThings;
