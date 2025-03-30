import React from "react";
import MenuRoutes from "./menuRoutes";
import ClubRoutes from "./clubRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MenuRoutes />} />
        <Route path="/club/*" element={<ClubRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;