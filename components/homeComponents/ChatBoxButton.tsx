import React from "react";
import { Button } from "../ui/button";

interface ChatBoxButtonProps {
  text?: string;
  icon: React.ReactNode;
  color: string;
  other?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  className?: string;
}

export default function ChatBoxButton({
  text,
  icon,
  color,
  other,
  isSelected,
  isDisabled,
  onClick,
  className,
}: ChatBoxButtonProps) {
  return (
    <Button
      disabled={isDisabled}
      className={`bg-white border-[2px] font-semibold gap-2 cursor-pointer text-xs !px-2 flex-1 relative h-10 hover:bg-white transition-all duration-300 hover:scale-105 ${
        isSelected
          ? "border-current text-current border-[3px]"
          : "text-black border-black"
      } ${className}`}
      style={isSelected ? { borderColor: color, color: color } : undefined}
      onClick={onClick}
    >
      {icon}
      {text}
      {other}
    </Button>
  );
}
