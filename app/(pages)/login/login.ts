"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
export const credentialsLogin = async (email: string, password: string, role: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      role
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};
