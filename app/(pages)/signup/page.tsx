"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function SignUpComponent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // const role = formData.get("role") as string;

    

    const toastID = toast.loading("Signing up...");

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        role:"student"
      });

      toast.success(res?.data?.message || "Signed up successfully", {
        id: toastID,
      });
      console.log(res?.data?.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred", {
        id: toastID,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-50 dark:bg-gray-900 dark:bg-none absolute top-0 z-50 w-full">
      <div className="relative bg-white shadow-sm dark:shadow-slate-100 shadow-black dark:bg-gray-800  rounded-lg w-full max-w-md p-6 mx-4">
        <div className="p-5">
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Sign Up
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please create an account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              required
              placeholder="Enter Your Full Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            />
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
            {/* radio */}
            {/* <div className="flex flex-col space-y-2 pb-2">
              <Label htmlFor="weRadio">Role:</Label>
              <RadioGroup
                className="flex items-center space-x-2"
                name="role"
                defaultValue="student"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="r1" />
                  <Label htmlFor="r1">student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="problemSolver" id="r2" />
                  <Label htmlFor="r2">problem Solver</Label>
                </div>
              </RadioGroup>
            </div> */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#4285f4] hover:underline transition"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
