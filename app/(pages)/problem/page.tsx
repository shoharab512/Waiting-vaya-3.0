import Problems from "@/app/(pages)/problem/Problems";
import { auth } from "@/auth";

const page =async () => {
  const session: any = await auth();
  return (
    <div className="flex flex-col min-h-screen justify-between mx-2 ">
      <Problems session={session} />
    </div>
  );
};

export default page;
