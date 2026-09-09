import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
//import CountriesPage from "./pages/CountriesPage";
import CountryDetailPage from "./pages/CountryDetailPage";
import CountryListPage from "./pages/CountryListPage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/countries" element={<CountryListPage />} />
        <Route path="/countries/:countryCode" element={<CountryDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
