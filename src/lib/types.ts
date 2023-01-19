import { AUTH_ERROR } from "./constants";

export type AuthError = keyof typeof AUTH_ERROR;

export interface FirebaseAuthError {
  code: number;
  message: string;
  errors: ErrorElement[];
}

export interface ErrorElement {
  message: AuthError;
  domain: string;
  reason: string;
}
