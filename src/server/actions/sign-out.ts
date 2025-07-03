"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export default async function SignOutAction(_formData: FormData) {
  const headersList = await headers();

  await auth.api.signOut({
    headers: headersList,
    asResponse: true,
  });

  revalidatePath("/");
}
