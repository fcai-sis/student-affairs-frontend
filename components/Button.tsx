import { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  variant: "primary" | "danger"
  icon: ReactNode
}

export default function Button({ children, variant, icon, onClick }: ComponentProps<"button"> & ButtonProps) {
  const style = {
    primary: "bg-blue-600 text-slate-50 hover:bg-blue-500 active:bg-blue-700",
    danger: "bg-red-600 text-slate-50 hover:bg-red-500 active:bg-red-700",
  }

  return (
    <button
      onClick={onClick}
      className={`flex justify-center gap-2 p-4 rounded-lg ${style[variant]} transition-colors duration-200 shadow-md hover:shadow-lg active:shadow-none outline-none w-fit min-w-28`}>
      {children}
      {icon}
    </button>
  );
}
