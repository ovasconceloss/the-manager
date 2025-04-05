import { useState } from "react";

const useManagerForm = () => {
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
    else if (currentTab === "attributes") setCurrentTab("summary");
  };

  const handlePreviousTab = () => {
    if (currentTab === "specialization") setCurrentTab("personal");
    else if (currentTab === "attributes") setCurrentTab("specialization");
    else if (currentTab === "summary") setCurrentTab("attributes");
  };

  const handleSave = () => {
    console.log("Manager Data:", managerData);
    localStorage.setItem("managerData", JSON.stringify(managerData));
    alert("Manager created successfully!");
  };

  const isFormComplete = (tab: string) => {
    const { personalDetails, specialization } = managerData;
  
    if (tab === "personal") {
      return (
        personalDetails.name?.trim() &&
        personalDetails.surname?.trim() &&
        personalDetails.nationality?.trim() &&
        personalDetails.dateOfBirth?.trim() &&
        personalDetails.gender?.trim()
      );
    }
  
    if (tab === "specialization") {
      const personalDetailsComplete =
        personalDetails.name?.trim() &&
        personalDetails.surname?.trim() &&
        personalDetails.nationality?.trim() &&
        personalDetails.dateOfBirth?.trim() &&
        personalDetails.gender?.trim();
  
      return personalDetailsComplete && !!specialization?.trim();
    }
  
    if (tab === "attributes") {
      const personalDetailsComplete =
        personalDetails.name?.trim() &&
        personalDetails.surname?.trim() &&
        personalDetails.nationality?.trim() &&
        personalDetails.dateOfBirth?.trim() &&
        personalDetails.gender?.trim();
  
      const specializationComplete = !!specialization?.trim();
  
      return personalDetailsComplete && specializationComplete && remainingPoints === 0;
    }
  
    if (tab === "summary") {
      const personalDetailsComplete =
        personalDetails.name?.trim() &&
        personalDetails.surname?.trim() &&
        personalDetails.nationality?.trim() &&
        personalDetails.dateOfBirth?.trim() &&
        personalDetails.gender?.trim();
  
      const specializationComplete = !!specialization?.trim();
      const attributesComplete = remainingPoints === 0;
  
      return personalDetailsComplete && specializationComplete && attributesComplete;
    }
  
    return false;
  };

  return {
    managerData,
    setManagerData,
    currentTab,
    setCurrentTab,
    totalPoints,
    usedPoints,
    remainingPoints,
    handleNextTab,
    handlePreviousTab,
    handleSave,
    isFormComplete,
  };
};

export default useManagerForm;