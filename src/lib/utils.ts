import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatPriceOptions {
  locale?: string;
  currency?: string;
}

export function formatPrice(
  price: number,
  options: FormatPriceOptions = {}
): string {
  const { locale = "vi-VN", currency = "VND" } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
}
