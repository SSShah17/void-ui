import { ReactNode } from "react";
import "./card.css";

interface VoidCardProps {
  children?: ReactNode;
  width?: string;
  height?: string;
}

export function Card(props: VoidCardProps) {
  return (
    <div
      className="voidCardOuter"
      style={{
        width: props.width ? props.width : "24dwv",
        height: props.height ? props.height : "40dvh",
      }}
    >
      {props.children}
    </div>
  );
}
