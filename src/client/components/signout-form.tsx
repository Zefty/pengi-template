"use client";

import { Button } from "../shadcn/button";
import { useServerAction } from "../hooks/use-server-action";
import { Alert, AlertTitle, AlertDescription } from "../shadcn/alert";
import SignOutAction from "~/server/actions/sign-out";

export function SignOutForm() {
  const [signOutState, signOutAction, isSignOutStatePending] =
    useServerAction(SignOutAction);

  return (
    <form className="flex flex-col gap-2 w-xl">
      <Button className="self-start" type="submit" formAction={signOutAction}>
        Sign Out
      </Button>
      {isSignOutStatePending && <div>Loading...</div>}
      {!isSignOutStatePending && signOutState?.error && (
        <FormErrorMessage
          name={signOutState.error.name}
          message={signOutState.error.message}
        />
      )}
    </form>
  );
}

function FormErrorMessage(props: { name: string; message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{props.name}</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}
