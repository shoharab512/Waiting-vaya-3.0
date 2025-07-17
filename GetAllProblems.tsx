"use client";
import axios from "axios";
import { toast } from "sonner";
import { setProblem, setTotalPages } from "@/redux/problemSlice";

const GetAllProblems = async (page: number, dispatch: any) => {
  try {
    const res = await axios.get(
      `/api/problems/getallproblems?limit=10&page=${page}`
    );
    dispatch(setProblem(res?.data?.data || []));
    dispatch(setTotalPages(res?.data?.totalPages || 0));
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
};

export default GetAllProblems;
