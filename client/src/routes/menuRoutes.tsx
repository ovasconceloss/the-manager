import React from "react";
import Menu from "@/pages/menu";
import { Routes, Route } from "react-router-dom";

const MenuRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
  );
};

export default MenuRoutes;