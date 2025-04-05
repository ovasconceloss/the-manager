import { convertFileSrc } from "@tauri-apps/api/core";

interface ClubCardProps {
  name: string;
  image_logo: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ name, image_logo, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`transition-all ease-in-out hover:scale-110 flex flex-col items-center justify-center h-[9.6rem] rounded-lg border cursor-pointer ${
        isSelected
          ? "border-[#67159C] bg-[#2A2A35]"
          : "border-[#2A2A35] bg-[#19181F] hover:border-[#67159C]"
      }`}
    >
      <img src={`${convertFileSrc(image_logo)}`} alt={`${name} logo`} className="w-16 h-16" />
      <p className="mt-2 text-md font-semibold">{name}</p>
    </div>
  );
};