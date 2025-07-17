import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { Theme } from "./ui/Theme";

import { auth } from "@/auth";
import Image from "next/image";
import {
  FaBlog,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";

import Profile from "@/components/profile/Profile";

const Navbar = async () => {
  const session: any = await auth();

  return (
    <nav className="bg-white z-50 dark:bg-[#020817] bg-opacity-30 backdrop-blur sticky top-0 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={"/"}
          className="text-black dark:text-white text-2xl font-bold flex items-center "
        >
          <Image
            width={33}
            height={33}
            src="/logo33.png"
            alt="ToLaxBlog Logo"
            className="mr-2 w-8 h-8 animate-bounce "
          />

          <span className="transition-opacity duration-300 ease-in-out hover:opacity-75">
            W|V
          </span>
        </Link>
        <ul className="md:flex space-x-6 hidden">
          <li>
            <Link href="/">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/problem">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                Problems
              </span>
            </Link>
          </li>
          {session?.user?.role === "admin" && (
            <li>
              <Link href="/admin">
                <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                  <FaInfoCircle className="mr-3" />
                  Admin
                </span>
              </Link>
            </li>
          )}

        </ul>
        <div className="space-x-3 hidden md:flex items-center">
          <Theme />
          {session ? (
            <>
              <Profile session={session} />
            </>
          ) : (
            <>
              {" "}
              <Link href={"/login"}>
                <Button>
                  <FaSignInAlt className="mr-3" />
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
        {/* For mobile devices */}
        {!session && (
          <Link href={"/login"} className="md:hidden block">
            <Button variant={"outline"} className="">
              <FaSignInAlt className="mr-3 " />
              Login
            </Button>
          </Link>
        )}

        {/* For mobile devices */}
        <div className="md:hidden block">
          <MobileNav session={session} />
        </div>
      </div>
    </nav>
  );
};

const MobileNav = ({ session }: { session: any }) => {
  return (
    <Sheet>
      <Theme />
      <SheetTrigger>
        <svg
          className="w-6 ml-2 h-6 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-800">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center text-black dark:text-white">
            Menu
          </SheetTitle>
        </SheetHeader>
        <ul className="space-y-4 mt-4">
          <li>
            <Link href="/">
              <SheetTrigger>
                <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                  <FaHome className="mr-3" />
                  Home
                </span>
              </SheetTrigger>
            </Link>
          </li>
          <li>
            <Link href="/problem">
              <SheetTrigger>
                <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                  <FaBlog className="mr-3" />
                  Problems
                </span>
              </SheetTrigger>
            </Link>
          </li>
          {session?.user?.role === "admin" && (
            <li>
              <Link href="/admin">
                <SheetTrigger>
                  <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                    <FaInfoCircle className="mr-3" />
                    Admin
                  </span>
                </SheetTrigger>
              </Link>
            </li>
          )}
         
        </ul>
        <div className="space-x-3 absolute left-2 bottom-2 flex items-center">
          {session ? (
            <div className="dark:bg-gray-800 flex items-center space-x-2 dark:text-white p-4 rounded">
              <Profile session={session} />
              <span className="font-bold">{session?.user?.name}</span>
            </div>
          ) : (
            ""
            // <div className="dark:bg-gray-800 dark:text-white p-4 rounded">
            //   <Link href="/login">
            //     <SheetTrigger>
            //       <Button>
            //         <FaSignInAlt className="mr-3" />
            //         Login
            //       </Button>
            //     </SheetTrigger>
            //   </Link>
            // </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
