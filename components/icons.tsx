import { ComponentProps } from "react";

export function NavArrowDownIcon({ className }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 9L12 15L18 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

export function LanguageIcon({ className }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13 2.04883C13 2.04883 16 5.99945 16 11.9994C16 17.9994 13 21.9501 13 21.9501" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 21.9501C11 21.9501 8 17.9994 8 11.9994C8 5.99945 11 2.04883 11 2.04883" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M2.62964 15.5H21.3704" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M2.62964 8.5H21.3704" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
