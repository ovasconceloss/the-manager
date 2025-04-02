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
      className={`flex flex-col items-center justify-center h-20 rounded-lg border cursor-pointer ${
        isSelected
          ? "border-[#67159C] bg-[#2A2A35]"
          : "border-[#2A2A35] bg-[#19181F] hover:border-[#67159C]"
      }`}
    >
      <img src={`${convertFileSrc(image_logo)}`} alt={`${name} logo`} className="w-10 h-10" />
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
};