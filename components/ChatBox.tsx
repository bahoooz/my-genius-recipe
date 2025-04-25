import React from "react";
import { Textarea } from "./ui/textarea";
import ChatBoxButton from "./ChatBoxButton";
import {
  Candy,
  Snowflake,
  Image,
  Flame,
  Drumstick,
  FileStack,
  CookingPot,
} from "lucide-react";
import { Button } from "./ui/button";

export default function ChatBox() {
  return (
    <div className="mt-8">
      <div className=" bg-[var(--color-brown-1)] p-3 rounded-2xl overflow-hidden">
        <Textarea
          className="bg-[var(--color-brown-2)] border-none outline-none text-white placeholder:text-[#EBEBEB] h-14 max-h-14 rounded-lg mb-8"
          placeholder="Entrez les ingrédients ici..."
        />
        <div className="bg-[var(--color-brown-2)] p-3 rounded-lg flex flex-col gap-3 overflow-hidden">
          <div className="flex justify-between gap-3">
            <ChatBoxButton
              text="Recette froide"
              icon={<Snowflake className="min-w-5 min-h-5" />}
              color="--color-chatbox-btn-1"
            />
            <ChatBoxButton
              text="Recette sucrée"
              icon={<Candy className="min-w-5 min-h-5" />}
              color="--color-chatbox-btn-2"
            />
          </div>
          <div className="flex justify-between gap-3">
            <ChatBoxButton
              text="Recette chaude"
              icon={<Flame className="min-w-5 min-h-5" />}
              color="--color-chatbox-btn-4"
            />
            <ChatBoxButton
              text="Recette sucrée"
              icon={<Drumstick className="min-w-5 min-h-5" />}
              color="--color-chatbox-btn-5"
            />
          </div>
          <div className="flex justify-between gap-3">
            <ChatBoxButton
              icon={<Image className="min-w-6 min-h-6" />}
              color="--color-chatbox-btn-3"
            />
            <ChatBoxButton
              icon={<FileStack className="min-w-6 min-h-6" />}
              color="--color-chatbox-btn-6"
              other={
                <span className="absolute -translate-x-1/2 -translate-y-1/2 top-[70%] left-[60%] text-sm font-bold">
                  1
                </span>
              }
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Button className="bg-[var(--color-brown-2)] rounded-xl mt-4 ml-auto"><CookingPot size={20} /> Générer</Button>
      </div>
    </div>
  );
}
