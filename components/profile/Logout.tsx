import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Logout = async ({ session }: { session: any }) => {
  if (!session?.user) redirect("/");

  return (
    <div className="mt-6 text-center">
      <form
        action={async () => {
          "use server";

          // Sign out user
          await signOut();

          // Manually clear the session cookie
          cookies().set("session", "", { expires: new Date(0), path: "/" });

          // Optionally redirect after logout
          redirect("/login");
        }}
      >
        <Button type="submit" variant="destructive">
          Log out
        </Button>
      </form>
    </div>
  );
};

export default Logout;
