/** ------------------- */
/** Utilities */
/** ------------------- */
export type Success<T> = {
  value: T;
  error: null;
};

export type Failure<E> = {
  value: null;
  error: E;
};

export type Result<T, E> = Success<T> | Failure<E>;
