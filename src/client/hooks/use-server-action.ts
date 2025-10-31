import { useActionState, useTransition } from "react";

export function useServerAction<State>(
  action: (state: Awaited<State>) => State | Promise<State>
): [Awaited<State>, () => void, boolean];

export function useServerAction<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>
): [Awaited<State>, (payload: Payload) => void, boolean];

export function useServerAction<State, Payload>(
  action:
    | ((state: Awaited<State>) => State | Promise<State>)
    | ((state: Awaited<State>, payload: Payload) => State | Promise<State>)
): [
  state: Awaited<State>,
  dispatch: (payload: Payload) => void,
  isPending: boolean
] {
  const [isTransitionPending, startTransition] = useTransition();
  const [state, formAction, isActionPending] = useActionState(
    action,
    null as Awaited<State>
  );
  const formActionWithTransition = (...args: [Payload]) => {
    startTransition(() => {
      formAction(...args);
    });
  };

  return [
    state,
    formActionWithTransition,
    isActionPending || isTransitionPending,
  ];
}
