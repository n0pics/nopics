import { clsx, type ClassValue } from 'clsx';

/** Utilitaire pour combiner des classes Tailwind conditionnellement */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
