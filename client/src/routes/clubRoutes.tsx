import React from "react";
import ChooseClub from "@/pages/club/clubChoose";
import { Routes, Route } from "react-router-dom";

const ClubRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/choose" element={<ChooseClub />} />
      </Routes>
  );
};

export default ClubRoutes;