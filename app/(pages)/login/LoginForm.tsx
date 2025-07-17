"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { credentialsLogin } from "./login";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const toastID = toast.loading("Signing up...");

    try {
      const error = await credentialsLogin(email, password,role);
      if (!error) {
        toast.success("Logged in successfully", {
          id: toastID,
        });
        router.refresh();
      } else {
        toast.error(String(error), {
          id: toastID,
        });
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        name="email"
        required
        placeholder="Email Address"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="w-full px-3 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
      />
      {/* <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <a
          href="/forgot-password"
          className="text-blue-800 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition"
        >
          Reset your password? (Coming soon...)
        </a>
      </p> */}
      <div className="flex flex-col space-y-2 pb-2">
        <Label htmlFor="weRadio">Role:</Label>
        <RadioGroup
          className="flex items-center space-x-2"
          name="role"
          defaultValue="student"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="r1" />
            <Label htmlFor="r1">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="problemSolver" id="r2" />
            <Label htmlFor="r2">Problem Solver</Label>
          </div>
        </RadioGroup>
      </div>
      <button
        type="submit"
        className="w-full py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default LoginForm;
