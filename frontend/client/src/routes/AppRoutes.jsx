import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SubjectPage from "../pages/SubjectPage";
import DeckView from "../pages/DeckView";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/subject/:subjectId" element={<SubjectPage />} />
      <Route path="/deck/:subjectId" element={<DeckView />} />
    </Routes>
  </Router>
);

export default AppRoutes;
