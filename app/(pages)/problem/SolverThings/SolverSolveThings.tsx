"use client";

import SolverAcceptedProblem from "@/ApiCall/SolverAcceptedProblem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCount,
  selectSolverProblemSolvePage,
  selectSolverProblemSolveTotalPages,
  selectSolverSolveProblems,
} from "@/redux/problemSlice";
import { Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import BigImagemodal from "../BigImagemodal";
import CancelButton from "../CancelButton";
import Pagination from "../Pagination";
import Solve from "../Solve";

const SolverSolveThings = ({ session }: { session: any }) => {
  const page = useAppSelector(selectSolverProblemSolvePage);
  const totalPages = useAppSelector(selectSolverProblemSolveTotalPages);
  const countproblem = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const SolverSolveProblems = useAppSelector(selectSolverSolveProblems);
  const role = "SolverSolve";
  // Solver accepted Problems
  useEffect(() => {
    const fetchData = async () => {
      await SolverAcceptedProblem(page, dispatch);
    };

    fetchData();
  }, [page, countproblem, dispatch]);
  return (
    <>
      {SolverSolveProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SolverSolveProblems.map((item: any, index: number) => {
            if (!item?.problemId) return null;
            return (
              <Card key={index} className="w-full max-w-2xl mx-auto">
                <CardHeader className="items-end p-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {item?.problemId?.createdAt
                      ? new Date(item?.problemId?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "Unknown Date"}
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="mb-2">
                      <BigImagemodal item={item} />
                      <div className="flex space-x-2 mt-3">
                        <Badge variant="secondary">
                          {item?.problemId?.subject}
                        </Badge>
                        <Badge variant="secondary">
                          {item?.problemId?.chapter}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-semibold text-lg">Question: </span>
                      <span className="text-sm text-muted-foreground break-words">
                        {item?.problemId?.message}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`flex justify-between`}>
                  <Link href={`/problem/${item?.problemId?._id}`}>
                    <Button variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      See Solution
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-2">
                    <Solve item={item?.problemId} />
                    <CancelButton item={item?.problemId} />
                  </div>
                </CardFooter>
              </Card>
            );
          })}
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
export default SolverSolveThings;
