
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./model/userModel";
import bcryptjs from "bcryptjs";
import database from "./DataBase/database";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      authorize: async (credentials: any) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const role = credentials?.role as string | undefined;
        console.log(credentials);

        if (!email || !password || !role) {
          throw new CredentialsSignin({
            cause: "All fields are required",
          });
        }
        await database();
        const user = await User.findOne({
          email,
        }).select("+password");

        if (!user) {
          throw new CredentialsSignin({
            cause: "Invalid Email, Password, or Role",
          });
        }

        if (!user.password) {
          throw new CredentialsSignin({
            cause: "Invalid Email, Password, or Role",
          });
        }
        if (user.role === "admin") {
          const isMatch = await bcryptjs.compare(password, user.password);
          if (!isMatch) {
            throw new CredentialsSignin({
              cause: "Invalid Email, Password, or Role",
            });
          }

          return { name: user.name, email: user.email, id: user._id, role: user.role };
        }
        if (user.role !== role) {
          throw new CredentialsSignin({
            cause: "Invalid Email, Password, or Role",
          });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          throw new CredentialsSignin({
            cause: "Invalid Email, Password, or Role",
          });
        }

        return { name: user.name, email: user.email, id: user._id, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }: { user: any, account: any }) => {
      if (account?.provider === "google") {
        try {
          const { name, email, image, id } = user;
          await database();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({
              name,
              email,
              role: "student",
              image,
              googleId: id,
            });
          }
          return true;
        } catch (error) {
          throw new AuthError("Failed to create user");
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      // Add role to the token if user is present
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {

      session.user.role = token.role;
      // console.log("Session data with role:", session.user);
      return session;
    },
  },

});
