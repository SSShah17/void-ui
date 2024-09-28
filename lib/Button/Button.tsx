import type { ReactNode } from "react";
import "./button.css";

export function Button({ children }: { children: ReactNode }) {
  return <button>{children}</button>;
}
