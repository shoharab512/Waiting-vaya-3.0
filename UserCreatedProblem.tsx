"use client";

import { setStudentTotalPages, setUserCreatedProblems } from "@/redux/problemSlice";
import axios from "axios";

const UserCreatedProblem = async (page: number, dispatch: any) => {
  try {
    const res = await axios.get(
      `/api/problems/getuserpostedproblems?limit=10&page=${page}`
    );

    dispatch(setUserCreatedProblems(res?.data?.data));
    dispatch(setStudentTotalPages(res?.data?.totalPages || 0));
  } catch (error: any) {
    console.log(error?.response?.data?.message);
  }
};

export default UserCreatedProblem;
