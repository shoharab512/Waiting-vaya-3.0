"use client";
import { setSolverProblemSolveTotalPages, setSolverSolveProblems } from "@/redux/problemSlice";
import axios from "axios";
import { toast } from "sonner";

const SolverAcceptedProblem = async (page: number, dispatch: any) => {
  try {
    const res = await axios.get(
      `/api/solve/solveracceptedprblm?limit=10&page=${page}`
    );
    dispatch(setSolverSolveProblems(res?.data?.data));
    dispatch(setSolverProblemSolveTotalPages(res?.data?.totalPages));
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
};

export default SolverAcceptedProblem;
