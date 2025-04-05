import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  currentTab: string;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ currentTab }) => {
  return (
    <Tabs value={currentTab} className="space-y-6">
      <TabsList className="flex justify-center space-x-4 bg-[#2A2A35]">
        <TabsTrigger
          value="personal"
          className={`w-48 text-white uppercase text-sm font-medium ${
            currentTab === "personal" ? "bg-[#67159C]" : "bg-[#2A2A35]"
          }`}
          disabled
        >
          Personal Details
        </TabsTrigger>
        <TabsTrigger
          value="specialization"
          className={`w-48 text-white uppercase text-sm font-medium ${
            currentTab === "specialization" ? "bg-[#67159C]" : "bg-[#2A2A35]"
          }`}
          disabled
        >
          Specialization
        </TabsTrigger>
        <TabsTrigger
          value="attributes"
          className={`w-48 text-white uppercase text-sm font-medium ${
            currentTab === "attributes" ? "bg-[#67159C]" : "bg-[#2A2A35]"
          }`}
          disabled
        >
          Attributes
        </TabsTrigger>
        <TabsTrigger
          value="summary"
          className={`w-48 text-white uppercase text-sm font-medium ${
            currentTab === "summary" ? "bg-[#67159C]" : "bg-[#2A2A35]"
          }`}
          disabled
        >
          Summary
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsNavigation;