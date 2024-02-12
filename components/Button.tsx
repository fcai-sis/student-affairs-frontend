import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  variant: "primary" | "danger" | "secondary"
  icon?: ReactNode
} & (
    {
      asLink: true,
      myHref: string
      onClick?: never
    } | {
      asLink?: false,
      onClick?: () => void
      myHref?: never
    }
  )

export function buttonClassName(variant: "primary" | "danger" | "secondary") {
  const style = {
    primary: "bg-blue-600 text-slate-50 hover:bg-blue-500 active:bg-blue-700",
    danger: "bg-red-600 text-slate-50 hover:bg-red-500 active:bg-red-700",
    secondary: "bg-slate-100 text-slate-400 hover:bg-slate-200 active:bg-slate-300",
  }

  const className = `cursor-pointer flex justify-center gap-2 p-4 rounded-lg ${style[variant]} transition-colors duration-200 shadow-md hover:shadow-lg active:shadow-none outline-none w-fit min-w-28 font-bold`;

  return className;
}

export default function Button({ children, variant, icon, onClick, asLink, myHref }: ComponentProps<"button"> & ButtonProps) {
  const className = buttonClassName(variant);

  if (asLink) {
    return (
      <Link
        className={className}
        href={myHref}>
        {children}
        {icon ? icon : <></>}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}>
      {children}
      {icon ? icon : <></>}
    </button>
  );
}
