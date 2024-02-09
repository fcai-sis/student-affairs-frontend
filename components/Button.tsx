import { PropsWithChildren } from "react";

type ButtonProps = {
  variant: "primary" | "danger"
}

export default function Button({ children, variant }: PropsWithChildren<ButtonProps>) {
  const bgColor = variant === "primary" ? "blue" : "red";

  return (
    <button
      className={`cursor-pointer bg-${bgColor}-600 text-slate-50 p-2 rounded-lg shadow-md hover:bg-${bgColor}-500 hover:shadow-xl active:bg-${bgColor}-700 active:shadow-none`}
      type="button"
    >
      {children}
    </button>
  );
}
