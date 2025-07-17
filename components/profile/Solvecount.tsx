"use client";

import { useEffect, useState } from "react";
import axios from "axios";


const Solvecount = () => {
  const [solveCount, setSolveCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolveCount = async () => {
      try {
        const res = await axios.get("/api/solve/countsolve");
        setSolveCount(res?.data?.data || 0);
      } catch (error) {
        console.log("error");
        
      } finally {
        setLoading(false);
      }
    };

    fetchSolveCount();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  return <span>{solveCount}</span>;
};

export default Solvecount;
