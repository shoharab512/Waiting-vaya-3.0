"use client";
import { setAllUser } from "@/redux/problemSlice";
import axios from "axios";
import { toast } from "sonner";

const GetAllUsers = async (dispatch: any) => {
  try {
    const res = await axios.get(`/api/auth/getallusers`);
    dispatch(setAllUser(res?.data?.data || []));
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
};

export default GetAllUsers;
