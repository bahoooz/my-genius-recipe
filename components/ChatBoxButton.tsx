import React from "react";
import { Button } from "./ui/button";

interface ChatBoxButtonProps {
  text?: string;
  icon: React.ReactNode;
  color: string;
  other?: React.ReactNode;
}

export default function ChatBoxButton({
  text,
  icon,
  color,
  other,
}: ChatBoxButtonProps) {
  return (
    <Button
      className="bg-white border-[2px] font-semibold gap-2 cursor-pointer text-xs !px-2 flex-1 relative h-10 hover:bg-white transition-all duration-300"
      style={{
        borderColor: `var(${color})`,
        color: `var(${color})`,
      }}
    >
      {icon}
      {text}
      {other}
    </Button>
  );
}
