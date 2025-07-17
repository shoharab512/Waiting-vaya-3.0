"use client";

import UserCreatedProblem from "@/ApiCall/UserCreatedProblem";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCount,
  selectDelete,
  selectStudentPage,
  selectStudentTotalPages,
  selectUserCreatedProblems,
} from "@/redux/problemSlice";
import { useEffect } from "react";
import Pagination from "../Pagination";
import SingleProblem from "../SingleProblem";
const StudentThings = ({ session }: { session: any }) => {
  const userCreatedProblems = useAppSelector(selectUserCreatedProblems);
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectStudentPage);
  const totalPages = useAppSelector(selectStudentTotalPages);
  const countproblem = useAppSelector(selectCount);
  const countDelete = useAppSelector(selectDelete);
  const role = "student";
  // user created problems
  useEffect(() => {
    const fetchData = async () => {
      await UserCreatedProblem(page, dispatch);
    };

    fetchData();
  }, [countproblem, page, countDelete, dispatch]);
  return (
    <>
      {userCreatedProblems.length > 0 ? (
        <div className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCreatedProblems.map((item: any, index: number) => (
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
export default StudentThings;
