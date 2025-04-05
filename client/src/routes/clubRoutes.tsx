import React from "react";
import ChooseClub from "@/pages/club/clubChoose";
import { Routes, Route } from "react-router-dom";
import CreateManager from "@/pages/manager/createManager";
import { ProfileProvider } from "@/context/ProfileContext";

const ClubRoutes: React.FC = () => {
  return (
    <ProfileProvider>
      <Routes>
        <Route path="/choose" element={<ChooseClub />} />
        <Route path="/create/manager" element={<CreateManager />} />
      </Routes>
    </ProfileProvider>
  );
};

export default ClubRoutes;