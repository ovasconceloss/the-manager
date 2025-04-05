import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttributesForm from "./components/attributes";
import TabsNavigation from "./components/tabsNavigation";
import SpecializationForm from "./components/specializations";
import PersonalDetailsForm from "./components/personalDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateManager: React.FC = () => {
  const [managerData, setManagerData] = useState({
    personalDetails: {
      name: "",
      surname: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      placeOfBirth: "",
    },
    specialization: "",
    attributes: {
      attacking: 10,
      defending: 10,
      fitness: 10,
      tactical: 10,
      mental: 10,
      technical: 10,
      adaptability: 10,
      determination: 10,
      discipline: 10,
      motivating: 10,
    },
  });

  const [currentTab, setCurrentTab] = useState("personal");

  const totalPoints = 100;
  const usedPoints = Object.values(managerData.attributes).reduce((a, b) => a + b, 0);
  const remainingPoints = totalPoints - usedPoints;

  const handleNextTab = () => {
    if (currentTab === "personal") setCurrentTab("specialization");
    else if (currentTab === "specialization") setCurrentTab("attributes");
  };

  const handlePreviousTab = () => {
    if (currentTab === "specialization") setCurrentTab("personal");
    else if (currentTab === "attributes") setCurrentTab("specialization");
  };

  const handleSave = () => {
    console.log("Manager Data:", managerData);
    localStorage.setItem("managerData", JSON.stringify(managerData));
  };

  const isFormComplete = () => {
    const { personalDetails, specialization } = managerData;
    const personalComplete = Object.values(personalDetails).every((value) => value.trim() !== "");
    const specializationComplete = specialization.trim() !== "";
    const attributesComplete = usedPoints === totalPoints;

    return personalComplete && specializationComplete && attributesComplete;
  };

  return (
    <main className="relative h-screen w-screen bg-gradient-to-br from-[#1E1E26] to-[#2A2A35] text-white">
      <article className="flex items-center justify-between px-8 py-4 bg-[#19181F] border-b border-[#2A2A35]">
        <div className="flex items-center gap-4">
          <Link to="/club/choose">
            <Button className="cursor-pointer flex items-center gap-2 bg-transparent hover:bg-[#67159C] px-4 py-2 rounded-md">
              <MoveLeft className="w-10 h-10" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold uppercase">Create Career Game</h1>
        </div>
      </article>
      <div className="mt-10 flex flex-col items-center justify-center">
        <Card className="w-[70rem] bg-[#19181F] text-white rounded-lg border border-[#2A2A35]">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold uppercase tracking-wide">
              Create Your Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TabsNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === "personal" && (
              <PersonalDetailsForm managerData={managerData} setManagerData={setManagerData} />
            )}
            {currentTab === "specialization" && (
              <SpecializationForm managerData={managerData} setManagerData={setManagerData} />
            )}
            {currentTab === "attributes" && (
              <AttributesForm
                managerData={managerData}
                setManagerData={setManagerData}
                remainingPoints={remainingPoints}
                handleSave={handleSave}
                isFormComplete={isFormComplete}
              />
            )}
            <div className="mt-6 flex justify-between">
              {currentTab !== "personal" && (
                <Button
                  className="bg-[#67159C] hover:bg-[#4A0E6F] w-32 text-white px-4 py-2 rounded-md cursor-pointer"
                  onClick={handlePreviousTab}
                >
                  Back
                </Button>
              )}
              {currentTab !== "attributes" && (
                <Button
                  className="bg-[#67159C] hover:bg-[#4A0E6F] w-32 text-white px-4 py-2 rounded-md cursor-pointer"
                  onClick={handleNextTab}
                >
                  Next
                </Button>
              )}
              {currentTab === "attributes" && (
                <Button
                  className={`bg-[#67159C] hover:bg-[#4A0E6F] w-32 text-white px-4 py-2 rounded-md ${
                    !isFormComplete() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSave}
                  disabled={!isFormComplete()}
                >
                  Save
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CreateManager;