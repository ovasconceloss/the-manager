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

  const isFormComplete = () => {
    const { personalDetails, specialization } = managerData;
    const personalComplete = Object.values(personalDetails).every((value) => value.trim() !== "");
    const specializationComplete = specialization.trim() !== "";
    const attributesComplete = usedPoints === totalPoints;

    return personalComplete && specializationComplete && attributesComplete;
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