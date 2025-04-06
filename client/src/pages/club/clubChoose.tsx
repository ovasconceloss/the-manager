import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MoveLeft, ChevronsRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import { useProfile } from "@/hooks/useProfile";
import { ClubCard } from "./components/ClubCard";

interface Club {
  id: number;
  name: string;
  nation_id: number;
  image_logo: string;
}

const ChooseClub: React.FC = () => {
  const { selectedClub, setSelectedClub } = useProfile();
  const [selectedNation, setSelectedNation] = useState("England");
  const [apiUrl, setApiUrl] = useState(`static/club/all/${selectedNation}`);

  const { data: clubs } = useFetch<Club[]>(apiUrl);

  useEffect(() => {
    setApiUrl(`static/club/all/${selectedNation}`);
  }, [selectedNation]);

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
        <Link to={selectedClub ? "/club/create/manager" : "#"}>
          <Button
            className={`bg-[#1E1E26] uppercase cursor-pointer hover:bg-[#67159C] ${!selectedClub ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!selectedClub}
          >
            Continue <ChevronsRight />
          </Button>
        </Link>
      </article>
      <section className="flex items-center justify-between px-8 py-4 bg-[#19181F] border-b border-[#2A2A35]">
        <div className="flex items-center gap-4">
          <Select defaultValue="England" value={selectedNation} onValueChange={setSelectedNation}>
            <SelectTrigger className="cursor-pointer w-64 border border-[#19181F] bg-[#2A2A35] 
            text-white px-4 py-2 rounded-md hover:bg-[#19181F] hover:border-[#2A2A35]">
              <SelectValue placeholder="Nation" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A35]">
              <SelectItem value="England" className="focus:bg-[#67159C] focus:text-white text-white cursor-pointer">England</SelectItem>
              <SelectItem value="Spain" className="focus:bg-[#67159C] focus:text-white text-white cursor-pointer">Spain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className="p-8">
        <div className="grid grid-cols-5 gap-4">
          {clubs?.map((club, index) => (
            <ClubCard
              key={index}
              name={club.name}
              image_logo={club.image_logo}
              isSelected={club.name === selectedClub}
              onClick={() => setSelectedClub(club.name)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ChooseClub;