import React from "react";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import SummaryTab from "./components/summary";
import { Button } from "@/components/ui/button";
import useManagerForm from "@/hooks/useManagerForm";
import AttributesForm from "./components/attributes";
import TabsNavigation from "./components/tabsNavigation";
import SpecializationForm from "./components/specializations";
import PersonalDetailsForm from "./components/personalDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateManager: React.FC = () => {
  const {
    managerData,
    setManagerData,
    currentTab,
    handleNextTab,
    handlePreviousTab,
    handleSave,
    remainingPoints,
    isFormComplete,
  } = useManagerForm();

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
        <Card className="w-[80rem] h-[45rem] bg-[#19181F] text-white rounded-lg border border-[#2A2A35] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold uppercase tracking-wide">
              Create Your Manager
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-center">
              <TabsNavigation currentTab={currentTab} />
            </div>
            <div>
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
                  remainingPoints={remainingPoints} handleSave={function (): void {
                    throw new Error("Function not implemented.");
                  } } isFormComplete={function (): boolean {
                    throw new Error("Function not implemented.");
                  } }                />
              )}
              {currentTab === "summary" && (
                <SummaryTab
                  managerData={{
                    ...managerData,
                    personalDetails: {
                      ...managerData.personalDetails,
                      age: new Date().getFullYear() - new Date(managerData.personalDetails.dateOfBirth).getFullYear(),
                    },
                  }}
                />
              )}
            </div>
            <div className="mt-6 flex justify-between">
              {currentTab !== "personal" && (
                <Button
                  className="bg-[#67159C] hover:bg-[#4A0E6F] w-32 text-white px-4 py-2 rounded-md cursor-pointer"
                  onClick={handlePreviousTab}
                >
                  Back
                </Button>
              )}
              {currentTab !== "summary" && (
                <Button
                  className={`bg-[#67159C] hover:bg-[#4A0E6F] w-32 text-white px-4 py-2 rounded-md cursor-pointer ${
                    !isFormComplete(currentTab) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleNextTab}
                  disabled={!isFormComplete(currentTab)}
                >
                  Next
                </Button>
              )}
              {currentTab === "summary" && (
                <Button
                  className={`bg-[#67159C] hover:bg-[#4A0E6F] w-32 text-white px-4 py-2 rounded-md cursor-pointer ${
                    !isFormComplete(currentTab) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSave}
                  disabled={!isFormComplete(currentTab)}
                >
                  Confirm
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