import React from "react";
import { Button } from "@/components/ui/button";

interface SpecializationFormProps {
  managerData: any;
  setManagerData: (data: any) => void;
}

const SpecializationForm: React.FC<SpecializationFormProps> = ({ managerData, setManagerData }) => {
  const handleSpecializationChange = (value: string) => {
    setManagerData((prev: any) => ({
      ...prev,
      specialization: value,
    }));
  };

  return (
    <div className="mt-5 space-y-4">
        <h2 className="text-lg font-semibold">Choose Your Specialization</h2>
        <div className="grid grid-cols-2 gap-4">
            <Button
            className={`bg-[#1E1E26] hover:bg-[#67159C] cursor-pointer ${managerData.specialization === "People Management" ? "ring-2 ring-[#67159C]" : ""}`}
            onClick={() => handleSpecializationChange("People Management")}
            >
            People Management
            </Button>
            <Button
                className={`bg-[#1E1E26] hover:bg-[#67159C] cursor-pointer ${managerData.specialization === "Tactical" ? "ring-2 ring-[#67159C]" : ""}`}
                onClick={() => handleSpecializationChange("Tactical")}
            >
                Tactical
            </Button>
            <Button
                className={`bg-[#1E1E26] hover:bg-[#67159C] cursor-pointer ${managerData.specialization === "Squad Building" ? "ring-2 ring-[#67159C]" : ""}`}
                onClick={() => handleSpecializationChange("Squad Building")}
            >
                Squad Building
            </Button>
            <Button
                className={`bg-[#1E1E26] hover:bg-[#67159C] cursor-pointer ${managerData.specialization === "Developer" ? "ring-2 ring-[#67159C]" : ""}`}
                onClick={() => handleSpecializationChange("Developer")}
            >
                Developer
            </Button>
        </div>
        <div className="mt-4 p-4 bg-[#2A2A35] rounded-md">
            <h3 className="text-lg font-bold">Specialization Details</h3>
            <p className="text-sm text-gray-400">
                {managerData.specialization === "People Management" && "Focuses on managing and motivating players effectively."}
                {managerData.specialization === "Tactical" && "Excels in creating and adapting game strategies."}
                {managerData.specialization === "Squad Building" && "Specializes in scouting and building a balanced team."}
                {managerData.specialization === "Developer" && "Focuses on improving player skills and long-term growth."}
            </p>
        </div>
    </div>
  );
};

export default SpecializationForm;