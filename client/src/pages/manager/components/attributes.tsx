import React from "react";

interface AttributesFormProps {
  managerData: any;
  setManagerData: (data: any) => void;
  remainingPoints: number;
  handleSave: () => void;
  isFormComplete: () => boolean;
}

const AttributesForm: React.FC<AttributesFormProps> = ({ managerData, setManagerData, remainingPoints }) => {
  const handleAttributeChange = (key: string, value: number) => {
    const currentAttributeValue = managerData.attributes[key as keyof typeof managerData.attributes];
    const pointsToAllocate = value - currentAttributeValue;

    if (value >= 0 && value <= 20 && remainingPoints - pointsToAllocate >= 0) {
      setManagerData((prev: any) => ({
        ...prev,
        attributes: { ...prev.attributes, [key]: value },
      }));
    }
  };

  return (
    <div className="mt-5 space-y-6">
      <h2 className="text-lg font-semibold">Allocate Your Attributes</h2>
      <p className="text-sm text-gray-400">
        Distribute your points wisely. Remaining points: <span className="font-bold">{remainingPoints}</span>
      </p>
      <div className="grid grid-cols-2 gap-6">
        {Object.keys(managerData.attributes).map((key) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="capitalize font-medium">{key.replace(/_/g, " ")}</label>
              <span className="text-sm text-gray-400">
                {managerData.attributes[key as keyof typeof managerData.attributes]} / 20
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full bg-[#2A2A35] h-4 rounded-md overflow-hidden">
                <div
                  className="h-full bg-[#67159C] transition-all duration-300"
                  role="progressbar"
                  style={{
                    width: `${(managerData.attributes[key as keyof typeof managerData.attributes] / 20) * 100}%`,
                  }}
                ></div>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={managerData.attributes[key as keyof typeof managerData.attributes]}
                onChange={(e) => handleAttributeChange(key, parseInt(e.target.value))}
                className="w-24 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributesForm;