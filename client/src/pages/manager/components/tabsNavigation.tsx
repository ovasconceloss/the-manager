import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ currentTab }) => {
  return (
    <Tabs value={currentTab} className="space-y-6">
      <TabsList className="flex justify-center space-x-4 bg-[#2A2A35] pointer-events-none">
        <TabsTrigger value="personal" className={`w-48 text-white uppercase text-sm font-medium ${currentTab === "personal" ? "bg-[#67159C]" : "bg-[#2A2A35]"}`}>
          Personal Details
        </TabsTrigger>
        <TabsTrigger value="specialization" className={`w-48 text-white uppercase text-sm font-medium ${currentTab === "specialization" ? "bg-[#67159C]" : "bg-[#2A2A35]"}`}>
          Specialization
        </TabsTrigger>
        <TabsTrigger value="attributes" className={`w-48 text-white uppercase text-sm font-medium ${currentTab === "attributes" ? "bg-[#67159C]" : "bg-[#2A2A35]"}`}>
          Attributes
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsNavigation;