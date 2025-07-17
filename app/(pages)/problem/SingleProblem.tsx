"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";

import Solve from "./Solve";

import BigImagemodal from "./BigImagemodal";
import CancelButton from "./CancelButton";

const SingleProblem = ({ item, session }: { item: any; session: any }) => {
  const postDate = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown Date";

  const isAdmin = session?.user?.role === "admin";
  let isSolver = session?.user?.role === "problemSolver";
  // const isUser =
  //   session?.user?.email && session?.user?.email === item?.userId?.email;
  const isPending = item?.status === "Pending";
  const isAccepted = item?.status === "Accepted"; // public problems
  const googleUser = session?.user?.image?.includes("googleusercontent");
  const isNaiem =
  session?.user?.email === "naiemsiddeki28@gmail.com" ||
  session?.user?.email === "tofaal91522@gmail.com";

  if (googleUser) {
    {
      isNaiem ? (isSolver = true) : null;
    }
  }
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="items-end p-3">
        {/* <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          {postDate}
        </div> */}
      </CardHeader>
      <CardContent>
        <div>
          <div className="mb-2">
            <BigImagemodal item={item} />
            <div className="flex space-x-2 mt-3">
              <Badge variant="secondary">{item?.subject}</Badge>
              <Badge variant="secondary">{item?.chapter}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-lg">Question: </span>
            <span className="text-sm text-muted-foreground break-words">
              {item?.message}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className={`flex justify-between`}>
        {isPending && (
          <>
            <Badge>Pending</Badge>
          </>
        )}

        {isAccepted && (
          <>
            <Link href={`/problem/${item?._id}`}>
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                See Solution
              </Button>
            </Link>
          </>
        )}
        {/* {isUser && <CancelButton item={item} />} */}

        {(isSolver || isAdmin) && (
          <div className="flex items-center space-x-2">
            <Solve item={item} />
            <CancelButton item={item} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SingleProblem;
