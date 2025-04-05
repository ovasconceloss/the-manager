import React from "react";
import ChooseClub from "@/pages/club/clubChoose";
import { Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";

const ClubRoutes: React.FC = () => {
  return (
    <ProfileProvider>
      <Routes>
        <Route path="/choose" element={<ChooseClub />} />
      </Routes>
    </ProfileProvider>
  );
};

export default ClubRoutes;