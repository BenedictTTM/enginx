import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDisplayRegisteredCount(createdAt: Date | string, baseCount: number): number {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffThreeHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 3)));
  return baseCount + diffThreeHours;
}
