"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export default async function SignOutAction(formData: FormData) {
  const headersList = await headers();

  const response = await auth.api.signOut({
    headers: headersList,
    asResponse: true,
  });

  revalidatePath("/");
}
