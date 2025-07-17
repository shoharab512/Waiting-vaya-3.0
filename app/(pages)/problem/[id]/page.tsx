"use client";

import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { MessageCircleQuestionIcon, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";
import BigImagemodal from "../BigImagemodal";
import SolveSkeleton from "../Skeleton/SolveSkeleton";

const Page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const [singleProblem, setSingleProblem] = useState<any>();
  const [singleSolve, setSingleSolve] = useState([]);

  const { id } = params;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const res1 = await axios.get(`/api/problems/getsingleproblem/${id}`);
        const res2 = await axios.get(`/api/solve/solvesingleproblem/${id}`);
        setSingleProblem(res1?.data?.data);
        setSingleSolve(res2?.data?.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [id]);

  const formatDate = (dateString?: string) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "Unknown Date";
  };
  const postDateForProblems = formatDate(singleProblem?.createdAt);

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-4 shadow-sm border rounded-md mb-4">
      {loading ? (
        <SolveSkeleton />
      ) : (
        <div>
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="mb-2">Posted on: {postDateForProblems}</Badge>
              <div className="text-xl font-bold flex items-center space-x-1 text-gray-900 dark:text-gray-100 mb-2">
                <MessageCircleQuestionIcon />
                {/* <em>{singleProblem?.userId?.name}</em> */} user
              </div>
              <div className="flex space-x-2 items-center">
                <Badge>{singleProblem?.subject}</Badge>
                <Badge>{singleProblem?.chapter}</Badge>
              </div>
            </div>
            <Link href="/problem">
              <div className="inline-flex cursor-pointer animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-2 font-medium text-white transition-colors">
                Back <FaArrowRight className="ml-2" />
              </div>
            </Link>
          </div>

          {/* Problem Details */}
          <div className=" p-6  shadow-sm border rounded-md">
            <div className="mx-auto flex items-center justify-center mb-4 h-48 max-w-xs rounded-lg">
              <BigImagemodal item={singleProblem} />
            </div>
            <p className="mb-8 text-start text-gray-900 dark:text-gray-100">
              <strong>Question: </strong>
              {singleProblem?.message}
            </p>
          </div>

          {/* Answers Section */}
          <div className="text-xl font-bold text-gray-900 dark:text-gray-100 my-4">
            # Answers ({singleSolve?.length || 0})
          </div>
          <div className=" p-6 shadow-sm border rounded-md mt-6">
            <div className="flex flex-col space-y-4">
              {singleSolve?.map((answer: any, index: any) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4 items-start">
                    <div>
                      <div className="flex space-x-1">
                        <User2 size={20} />
                        <p className="text-start text-gray-900 dark:text-gray-100">
                          {answer.users.map((user: any, idx: any) => (
                            <strong key={idx}>
                              {/* {user.name}{" "} */} user
                              <span className="text-sm font-normal">
                                ( {formatDate(answer?.createdAt)})
                              </span>
                            </strong>
                          ))}
                        </p>
                      </div>
                      <p className="mt-4">
                        <strong>Answer: </strong>
                        {answer?.message}
                      </p>
                    </div>
                    <div className="flex items-center mx-auto md:mx-0 md:justify-end w-48">
                      <BigImagemodal item={answer} />
                    </div>
                  </div>
                  {index < (singleSolve?.length || 0) - 1 && (
                    <hr className="my-4 border-gray-300 dark:border-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
