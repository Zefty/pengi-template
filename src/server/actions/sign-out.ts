"use server";

import { auth } from "../auth";
import { type Result } from "~/lib/entities/common";
import { tryCatch } from "~/lib/utils/common";
import { headers } from "next/headers";

type SignOutResponse = Awaited<ReturnType<typeof auth.api.signOut>>;

export default async function SignOutAction(
  _state: Result<SignOutResponse, Error> | null,
  _formData: FormData
) {
  const response = await tryCatch(
    auth.api.signOut({
      headers: await headers(),
    })
  );

  return response;
}
