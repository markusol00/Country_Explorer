import "./App.css";
//import CountriesPage from "./pages/CountriesPage";
import CountryDetailPage from "./pages/CountryDetailPage";
import CountryListPage from "./pages/CountryListPage";
import { Routes, Route } from "react-router";
import MainLayout from "../src/Layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import MyCountriesPage from "./pages/MyCountriesPage/MyCountriesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<MainLayout />}>
          <Route path="/countries" element={<CountryListPage />} />
          <Route
            path="/countries/:countryCode"
            element={<CountryDetailPage />}
          />
          <Route path="/mycountries" element={<MyCountriesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
