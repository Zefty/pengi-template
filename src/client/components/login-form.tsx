"use client";

import SignInAction from "~/server/actions/sign-in";
import SignUpAction from "~/server/actions/sign-up";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { useServerAction } from "../hooks/use-server-action";
import { Alert, AlertTitle, AlertDescription } from "../shadcn/alert";

export function LoginForm() {
  const [signInState, signInAction, isSignInStatePending] =
    useServerAction(SignInAction);
  const [signUpState, signUpAction, isSignUpPending] =
    useServerAction(SignUpAction);

  const isPending = isSignInStatePending || isSignUpPending;
  return (
    <form className="w-xl">
      <div className="flex gap-2 mb-2">
        <Input name="email" />
        <Input name="password" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button type="submit" formAction={signUpAction}>
            Sign Up
          </Button>
          <Button type="submit" formAction={signInAction}>
            Sign In
          </Button>
        </div>
        {isPending && <div>Loading...</div>}
        {!isPending && signInState?.error && (
          <FormErrorMessage
            name={signInState.error.name}
            message={signInState.error.message}
          />
        )}
        {!isPending && signUpState?.error && (
          <FormErrorMessage
            name={signUpState.error.name}
            message={signUpState.error.message}
          />
        )}
      </div>
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
