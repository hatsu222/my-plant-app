import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TopPage from "./pages/TopPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import ListofPlantsPage from "./pages/ListofPlantsPage";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import IncreasePlantsPage from "./pages/IncreasePlantsPage";
import IncreasePlantsPageHome from "./pages/IncreasePlantsPageHome";
import EditPlantPage from "./pages/EditPlantPage";
import FavoritePlantsPage from "./pages/FavoritePlantsPage";
import PlantIWantPage from "./pages/PlantIWantPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/list" element={<ListofPlantsPage />} />
        <Route
          path="/list/:sortName/:sortNumber"
          element={<ListofPlantsPage />}
        />
        <Route path="/favorite" element={<FavoritePlantsPage />} />
        <Route path="/want" element={<PlantIWantPage />} />
        <Route path="/details/:plantId" element={<PlantDetailsPage />} />
        <Route
          path="/details/:plantId/:sortName/:sortNumber"
          element={<PlantDetailsPage />}
        />
        <Route path="/my-page" element={<MyPage />} />
        <Route
          path="/increase-plants-home"
          element={<IncreasePlantsPageHome />}
        />
        <Route path="/increase-plants" element={<IncreasePlantsPage />} />
        <Route path="/edit/:plantId" element={<EditPlantPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
