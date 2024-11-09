import { useRef, type ReactNode, useEffect, useState } from "react";
import "./button.css";

interface VoidButtonProps {
  children: ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  activeBackgroundColor?: string;
  activerBorderColor?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
  height?: string;
}

export function Button(props: VoidButtonProps) {
  const voidButtonRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    props.backgroundColor ? props.backgroundColor : "transparent"
  );
  const [borderColor, setBorderColor] = useState(
    props.borderColor ? props.borderColor : "aquamarine"
  );

  function hoverIn() {
    setIsHovering(true);
  }
  function hoverOut() {
    setIsHovering(false);
  }

  useEffect(() => {
    if (isHovering && props.activeBackgroundColor) {
      setBackgroundColor(props.activeBackgroundColor);
    } else {
      setBackgroundColor(
        props.backgroundColor ? props.backgroundColor : "transparent"
      );
    }
    if (isHovering && props.activerBorderColor) {
      setBorderColor(props.activerBorderColor);
    } else {
      setBorderColor(props.borderColor ? props.borderColor : "aquamarine");
    }
  }, [isHovering]);

  useEffect(() => {
    voidButtonRef.current?.addEventListener("mouseenter", hoverIn);
    voidButtonRef.current?.addEventListener("mouseleave", hoverOut);
    return () => {
      voidButtonRef.current?.removeEventListener("mouseenter", hoverIn);
      voidButtonRef.current?.removeEventListener("mouseleave", hoverOut);
    };
  }, []);
  return (
    <div
      className="voidButtonOuter"
      style={{ width: props.width, height: props.height }}
    >
      <div
        className="voidButtonInner"
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={props.onClick ? props.onClick : () => {}}
        ref={voidButtonRef}
      >
        {props.children}
      </div>
    </div>
  );
}
