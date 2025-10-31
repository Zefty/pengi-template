"use server";

import { auth } from "../auth";
import { type Result } from "~/lib/entities/common";
import { redirect } from "next/navigation";
import { tryCatch } from "~/lib/utils/common";

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;

export default async function SignUpAction(
  state: Result<SignUpEmailResponse, Error> | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = email.split("@")[0];

  const response = await tryCatch(
    auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })
  );

  if (response.value) {
    redirect("/");
  }

  return response;
}
