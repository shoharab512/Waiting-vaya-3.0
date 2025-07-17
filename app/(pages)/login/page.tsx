import { auth, signIn } from "@/auth";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Component() {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-50 dark:bg-gray-900 dark:bg-none absolute top-0 z-50 w-full">
      <div className="relative shadow-sm dark:shadow-slate-100 shadow-black dark:bg-gray-800  rounded-lg w-full max-w-md p-6 mx-4">
        <div className="p-5">
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Sign In
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You need to be signed in to perform this action.
            </p>
          </div>

          <LoginForm />

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>
          {/* Social Buttons */}
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className="space-y-3"
          >
            <button className="inline-flex w-full items-center justify-center gap-2 h-10 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 p-2 text-sm font-medium text-black dark:text-white focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition">
              <Image
                width={18}
                height={18}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
              />
              Continue with Google
            </button>
          </form>
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="font-medium text-[#4285f4] hover:underline transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
