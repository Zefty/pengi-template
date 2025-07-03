"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export default async function SignUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = email.split("@")[0];

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
    asResponse: true,
  });

  revalidatePath("/");
}
