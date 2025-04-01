interface ClubCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ name, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center h-20 rounded-lg border cursor-pointer ${
        isSelected
          ? "border-[#67159C] bg-[#2A2A35]"
          : "border-[#2A2A35] bg-[#19181F] hover:border-[#67159C]"
      }`}
    >
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
};