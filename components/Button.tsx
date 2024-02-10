import { PropsWithChildren } from "react";

type ButtonProps = {
  variant: "primary" | "danger"
}

export default function Button({ children, variant }: PropsWithChildren<ButtonProps>) {
  const style = {
    primary: "bg-blue-600 text-slate-50 hover:bg-blue-500 active:bg-blue-700",
    danger: "bg-red-600 text-slate-50 hover:bg-red-500 active:bg-red-700",
  }

  return (
    <button className={`p-4 rounded-lg ${style[variant]} transition-colors duration-200 shadow-md hover:shadow-lg active:shadow-none outline-none w-fit min-w-32`}>
      {children}
    </button>
  );
}
