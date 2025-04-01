import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeft, ChevronsRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClubCard } from "./components/ClubCard";

const ChooseClub: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const clubs = [
    "Cracovia",
    "Górnik",
    "Jagiellonia",
    "KGHM Zagłębie",
    "Korona",
    "Lech",
    "Legia",
    "ŁKS Łódź",
    "Piast",
    "Pogoń",
    "Puszcza",
    "Radomiak",
    "Raków",
    "Śląsk",
    "Stal Mielec",
    "Warta Poznań",
    "Widzew",
  ];

  return (
    <main className="relative h-screen w-screen bg-[#1E1E26] text-white">
      <article className="flex items-center justify-between px-8 py-4 bg-[#19181F] border-b border-[#2A2A35]">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button className="cursor-pointer flex items-center gap-2 bg-transparent hover:bg-[#67159C] px-4 py-2 rounded-md">
              <MoveLeft className="w-10 h-10" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold uppercase">Create Career Game</h1>
        </div>
        <Button className="bg-[#1E1E26] uppercase cursor-pointer hover:bg-[#67159C]">
          Create Game <ChevronsRight />
        </Button>
      </article>
      <section className="flex items-center justify-between px-8 py-4 bg-[#19181F] border-b border-[#2A2A35]">
        <div className="flex items-center gap-4">
          <Select defaultValue="England">
            <SelectTrigger className="cursor-pointer w-64 border border-[#19181F] bg-[#2A2A35] 
            text-white px-4 py-2 rounded-md hover:bg-[#19181F] hover:border-[#2A2A35]">
              <SelectValue placeholder="Nation" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A35]">
              <SelectItem value="England" className="focus:bg-transparent focus:text-white text-white cursor-pointer">England</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className="p-8">
        <div className="grid grid-cols-5 gap-4">
          {clubs.map((club, index) => (
            <ClubCard
              key={index}
              name={club}
              isSelected={club === selectedClub}
              onClick={() => setSelectedClub(club)}
            />
          ))}
        </div>
      </section>
      <footer className="absolute bottom-0 left-0 right-0 px-8 py-4 bg-[#19181F] border-t border-[#2A2A35] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-sm text-gray-400">Reputation</p>
            <p className="text-lg font-bold">National</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Squad Ability</p>
            <p className="text-lg font-bold">⭐⭐⭐</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ChooseClub;