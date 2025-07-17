"use client";
import {
  setAriseProblems,
  setSolverProblemAriseTotalPages,
} from "@/redux/problemSlice";
import axios from "axios";
import { toast } from "sonner";

const GetProblemArise = async (page: number, dispatch: any) => {
  try {
    const res = await axios.get(
      `/api/problems/problemarises?limit=10&page=${page}`
    );
    dispatch(setAriseProblems(res?.data?.data || []));
    dispatch(setSolverProblemAriseTotalPages(res?.data?.totalPages || 0));
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
};

export default GetProblemArise;
