"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const Solve = ({ item }: { item: any }) => {
  const [input, setInput] = useState({
    image: "",
    message: "",
    problemId: item?._id,
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInput({ ...input, image: reader.result as string });
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const toastID = toast.loading("Submitting Answer...");
    try {
      const res = await axios.post("/api/solve/solve", input);
      const resAcceptedStatus = await axios.put(`/api/problems/acceptproblem?id=${item._id}`);
      console.log("Status Updated successfully");

      toast.success(res?.data?.message || "Answer Submitted successfully", {
        id: toastID,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred", {
        id: toastID,
      });
    } finally {
      setInput({
        image: "",
        message: "",
        problemId: item?._id,
      });
      // Close the dialog after submission
      (document.querySelector("[data-state='open']") as HTMLElement)?.click();
    }
  };
  const handleclickinput = () => {
    (document.querySelector("#uploadSolve") as HTMLInputElement)?.click();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className=" dark:bg-green-500/50 bg-green-600 hover:bg-green-700  text-white dark:hover:bg-green-600/50"
          variant="default"
        >
          Solve
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center pb-2">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="shadow bg-cover relative border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex flex-col-reverse items-center justify-center">
                <input
                  id="uploadSolve"
                  className="p-2 hidden"
                  type="file"
                  onChange={handleFileChange}
                />
                <div
                  onClick={handleclickinput}
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
                >
                  {input.image ? (
                    <Image
                      width={200}
                      height={200}
                      src={input.image || "/noimage.png"}
                      alt="Selected"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4m0 0l-4 4m4-4v12"
                        ></path>
                      </svg>
                      <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 ">
                        Click Choose File to upload
                      </span>
                    </>
                  )}
                </div>
              </div>
              <Textarea
                placeholder="Type your message here"
                value={input.message}
                onChange={(e) =>
                  setInput({ ...input, message: e.target.value })
                }
              />
              <Button type="submit">Submit</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default Solve;
