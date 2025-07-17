import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Avatarr from "./Avatarr";
import Logout from "./Logout";
import Solvecount from "./Solvecount";

const Profile = ({ session }: { session: any }) => {
  const googleUser = session?.user?.image?.includes("googleusercontent");
  const isNaiem =
    session?.user?.email === "naiemsiddeki28@gmail.com" ||
    session?.user?.email === "tofaal91522@gmail.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatarr session={session} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 shadow-lg rounded-lg w-72 ">
        <div className="text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
              <Image
                width={80}
                height={80}
                src={session?.user?.image || "/public.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold dark:text-white">
              {session?.user?.name}
              {googleUser ? (
                <>
                  {isNaiem ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-green-500"> (Solver)</span>
                      <div className="font-semibold text-xl text-green-500 flex items-center">
                        Solves: <Solvecount />
                      </div>
                    </div>
                  ) : (
                    <span className="text-green-500"> (Student)</span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-green-500">
                    {session?.user?.role === "student" ? (
                      <>(Student)</>
                    ) : (
                      <>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-green-500"> (Solver)</span>
                          <div className="font-semibold text-xl text-green-500 flex items-center">
                            Solves: <Solvecount />
                          </div>
                        </div>
                      </>
                    )}
                  </span>
                </>
              )}{" "}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Logout session={session} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
