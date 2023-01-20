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

export interface SessionUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;

  emailVerified: boolean;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductReturn {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
