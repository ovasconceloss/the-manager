import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SummaryTabProps {
  managerData: {
    personalDetails: {
      name: string;
      surname: string;
      age: number;
      placeOfBirth: string;
      nationality: string;
    };
    specialization: string;
    attributes: Record<string, number>;
  };
}

const SummaryTab: React.FC<SummaryTabProps> = ({ managerData }) => {
  const { personalDetails, specialization, attributes } = managerData;

  return (
    <div className="p-6 text-white space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6">Manager Summary</h2>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-4 bg-[#1E1E26] border border-[#2A2A35]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-white">
              <li className="w-64 p-3 bg-[#2A2A35] text-md capitalize rounded-4xl">{personalDetails.name} {personalDetails.surname}</li>
              <li className="w-64 p-3 bg-[#2A2A35] text-md capitalize rounded-4xl">{personalDetails.age} years old</li>
              <li className="w-64 p-3 bg-[#2A2A35] text-md capitalize rounded-4xl">{personalDetails.nationality} | {personalDetails.placeOfBirth}</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-4 bg-[#1E1E26] border border-[#2A2A35]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Specialization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="w-64 p-3 bg-[#2A2A35] text-md text-white capitalize rounded-4xl">{specialization}</p>
          </CardContent>
        </Card>
        <Card className="col-span-4 bg-[#1E1E26] border border-[#2A2A35]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-4 text-white">
              {Object.entries(attributes).map(([key, value]) => (
                <li key={key} className="flex justify-between p-2 bg-[#2A2A35] text-md text-white capitalize rounded-4xl">
                  <span className="font-medium capitalize">{key}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryTab;