"use server";

import { auth } from "../auth";
import { type Result } from "~/lib/entities/common";
import { redirect } from "next/navigation";
import { tryCatch } from "~/lib/utils/common";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type SignOutResponse = Awaited<ReturnType<typeof auth.api.signOut>>;

export default async function SignOutAction(
  state: Result<SignOutResponse, Error> | null,
  formData: FormData
) {
  const response = await tryCatch(
    auth.api.signOut({
      headers: await headers(),
    })
  );

  return response;
}
