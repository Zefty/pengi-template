"use server";

import { auth } from "../auth";
import { type Result } from "~/lib/entities/common";
import { redirect } from "next/navigation";
import { tryCatch } from "~/lib/utils/common";

type SignInEmailResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

export default async function SignInAction(
  state: Result<SignInEmailResponse, Error> | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await tryCatch(
    auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
        rememberMe: true,
      },
    })
  );

  if (response.value) {
    redirect("/");
  }

  return response;
}
