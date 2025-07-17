import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicThings from "./AdminThings/AdminThings";
import ProblemAriseThings from "./SolverThings/ProblemAriseThings";
import SolverSolveThings from "./SolverThings/SolverSolveThings";
import StudentThings from "./StudentThings/StudentThings";

const Problems = ({ session }: { session: any }) => {
  const notLoggedIn = !session;
  let isStudent = session?.user?.role === "student";
  let isProblemSolver = session?.user?.role === "problemSolver";
  const isAdmin = session?.user?.role === "admin";
  const googleUser = session?.user?.image?.includes("googleusercontent");
  // const isNaiem = session?.user?.email === "tofaal91522@gmail.com";
  const isNaiem =
  session?.user?.email === "naiemsiddeki28@gmail.com" ||
  session?.user?.email === "tofaal91522@gmail.com";

  if (googleUser) {
    {
      isNaiem ? (isProblemSolver = true) : (isStudent = true);
    }
  }
  return (
    <Tabs defaultValue="publicProblem">
      <div className="container mx-auto py-6 space-y-6">
        {notLoggedIn ? (
          <PublicThings session={session} />
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Filter Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <TabsList>
                  {/* Public Problems */}
                  <TabsTrigger value="publicProblem">Problems</TabsTrigger>

                  {/* Only for problemSolver */}
                  {isProblemSolver && (
                    <TabsTrigger value="ArisesProblem">
                      Problem Arises
                    </TabsTrigger>
                  )}

                  {/* Not for Admin */}
                  {!isAdmin && (
                    <TabsTrigger value="yourProblem">
                      {isStudent && "Your Created Problems"}
                      {isProblemSolver && "Solved"}
                    </TabsTrigger>
                  )}
                </TabsList>
              </CardContent>
            </Card>

            {/* Public Problems Content */}
            <TabsContent value="publicProblem">
              <PublicThings session={session} />
            </TabsContent>

            {/* Only for problemSolver */}
            {isProblemSolver && (
              <TabsContent value="ArisesProblem">
                <ProblemAriseThings session={session} />
              </TabsContent>
            )}

            {/* Not for Admin */}
            {!isAdmin && (
              <TabsContent value="yourProblem">
                {isStudent && <StudentThings session={session} />}
                {isProblemSolver && <SolverSolveThings session={session} />}
              </TabsContent>
            )}
          </>
        )}
      </div>
    </Tabs>
  );
};

export default Problems;
