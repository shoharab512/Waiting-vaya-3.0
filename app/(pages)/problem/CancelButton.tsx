"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setDelete } from "@/redux/problemSlice";

import axios from "axios";
import { toast } from "sonner";

const CancelButton = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();
  const deleteProblem = async () => {
    try {
      const res = await axios.delete(`/api/problems/userdelete?id=${item._id}`);
      dispatch(setDelete(1));
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            problem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProblem}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default CancelButton;
