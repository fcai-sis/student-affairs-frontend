import { PropsWithChildren } from "react";

export function H1({ children }: PropsWithChildren<{}>) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}

export function H2({ children }: PropsWithChildren<{}>) {
  return <h2 className="text-3xl font-bold">{children}</h2>;
}

export function H3({ children }: PropsWithChildren<{}>) {
  return <h3 className="text-2xl font-bold">{children}</h3>;
}

export function H4({ children }: PropsWithChildren<{}>) {
  return <h4 className="text-xl font-bold">{children}</h4>;
}

export function H5({ children }: PropsWithChildren<{}>) {
  return <h5 className="text-lg font-bold">{children}</h5>;
}

export function H6({ children }: PropsWithChildren<{}>) {
  return <h6 className="text-base font-bold">{children}</h6>;
}
