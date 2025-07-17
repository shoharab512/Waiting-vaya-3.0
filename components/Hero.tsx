"use client";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";
import Chapter from "./Chapter";
import Subject from "./Subject";

import { useAppDispatch } from "@/redux/hooks";
import { setCount } from "@/redux/problemSlice";
import Link from "next/link";

const Hero = () => {
  const dispatch = useAppDispatch();

  const [selectedSubject, setSelectedSubject] = useState<any>("");
  const [selectedChapter, setSelectedChapter] = useState("Chapter");
  const [input, setInput] = useState({
    image: "",
    message: "",
    subject: "",
    chapter: "",
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput((prevInput) => ({
          ...prevInput,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const toastID = toast.loading("Submitting Problem...");
    try {
      const res = await axios.post("/api/problems/problems", input);

      toast.success(res?.data?.message || "Problem Submitted successfully", {
        id: toastID,
      });
      dispatch(setCount(1));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred", {
        id: toastID,
      });
    } finally {
      setInput({
        image: "",
        message: "",
        subject: "",
        chapter: "",
      });
      setSelectedSubject("");
      setSelectedChapter("");
    }
  };

  return (
    <div className="md:mt-[-3rem]">
      <form
        onSubmit={handleSubmit}
        className="container flex min-h-[80vh] items-center justify-center md:h-screen md:mt-0 md:mb-0 mb-[3rem] mt-[3rem] px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center"
      >
        {/* form */}
        <div className="w-full h-fit text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <div className="mb-4 space-x-3">
            <Subject
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              setInput={setInput}
              input={input}
            />
            <Chapter
              input={input}
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
              setInput={setInput}
              selectedSubject={selectedSubject}
            />
          </div>
          <label
            className="block text-gray-700 dark:text-gray-500 text-sm font-bold mb-2"
            htmlFor="file-upload"
          >
            Upload your problem Image
          </label>
          <div className="shadow bg-cover relative border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center">
            <input
              className="hidden"
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
            >
              {input.image ? (
                <Image
                  width={200}
                  height={200}
                  src={input.image}
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
                    Click to upload
                  </span>
                </>
              )}
            </label>
          </div>

          <div className="grid mt-4 w-full gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={input.message}
              onChange={(e) =>
                setInput((prevInput) => ({
                  ...prevInput,
                  message: e.target.value,
                }))
              }
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 mt-4 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <FaPaperPlane className="mr-2" /> Submit your problem
          </button>
          <Link href={"/problem"}>
            <div
              className="relative mt-4 inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 text-center mx-auto w-full focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              aria-label="Border Magic Button"
              title="Button with a spinning border effect"
            >
              <span className="absolute inset-[-30%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                See Problems & Solutions <FaArrowRight className="ml-2" />
              </span>
            </div>
          </Link>
        </div>
        {/* heroimage */}

        <div className="w-full mt-4 lg:mt-0 lg:w-1/2 relative hidden lg:block">
          <Image
            width={300}
            height={300}
            src="/WaitingVayaImage.png"
            alt="tailwind css components"
            className="w-full h-full max-w-sm mx-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default Hero;
