import { useEffect, useState } from "react";
import type { Country } from "../../Types/Country";
import type { UserCountry } from "../../Types/UserCountry";
import { useParams, useNavigate } from "react-router";
import "./CountryDetailPage.css";
import populationIcon from "../../assets/icons/users_15861115.svg";
import markerIcon from "../../assets/icons/marker_17594032.svg";
import demonorway from "../../assets/demo-norway.png";
import currencyIcon from "../../assets/icons/currency_icon.svg";
import capitalIcon from "../../assets/icons/capitalIcon.svg";

function CountryDetailPage() {
  //Accesstoken
  const accessToken = sessionStorage.getItem("accessToken");
  //Type of Country if the user is not signed in
  const [country, setCountry] = useState<Country | null>(null);

  //Type of UserCountry if the user is signed in
  const [userCountry, setUserCountry] = useState<UserCountry | null>(null);

  const [status, setStatus] = useState("");
  const id = useParams();
  const countryId = id.countryCode;
  let navigate = useNavigate();

  //Fetching extra details (notes and status for the country)
  async function fetchUserCountry() {
    try {
      const response = await fetch(
        `http://localhost:3000/my-countries/${countryId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const fetchedUserCountry = await response.json();
      setUserCountry(fetchedUserCountry);
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch(
          `http://localhost:3000/countries/${countryId}`,
        );
        const fetchedCountry = await response.json();
        setCountry(fetchedCountry);
        console.log(fetchedCountry);
      } catch (error) {
        return false;
      }
    }
    fetchCountry();
    if (accessToken) {
      fetchUserCountry();
    }
  }, [countryId, accessToken]);

  async function ChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value;
    console.log(status);
    try {
      const response = await fetch(
        `http://localhost:3000/my-countries/${countryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        },
      );
      if (!response.ok) {
        console.error("Kunne ikke lagre status:", response.status);
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return false;
    }
  }

  return (
    <div className="country-detail-section">
      <button onClick={() => navigate(-1)}> ← Go back</button>
      <img src={demonorway} className="header-photo" alt="demo picture" />
      <section className="midlertidig">
        <div className="geographic-info-container">
          <span className="flag-icon">{country?.flag}</span>
          <div>
            <h1>{country?.name}</h1>
            <h2>{country?.continent}</h2>
          </div>
        </div>
        <select onChange={ChangeStatus}>
          <option value="">{userCountry?.status}</option>
          <option value="visited">Visited</option>
          <option value="planning">Planning</option>
          <option value="wishlist">Wishlist</option>
        </select>
      </section>
      <section>
        <div className="country-detail-container">
          <img
            src={capitalIcon}
            alt="Country Explorer logo"
            className="headerLogo"
          />
          <p>Capital</p>
          <p>{country?.capital || "Undefined"}</p>
        </div>
        <div className="country-detail-container">
          <img
            src={markerIcon}
            alt="Country Explorer logo"
            className="headerLogo"
          />
          <p>Continent</p>
          <p>{country?.continent}</p>
        </div>
        <div className="country-detail-container">
          <img
            src={populationIcon}
            alt="Country Explorer logo"
            className="headerLogo"
          />
          <p>population</p>
          <p>{country?.population || "Undefined"}</p>
        </div>
        <div className="country-detail-container">
          <img
            src={currencyIcon}
            alt="Country Explorer logo"
            className="headerLogo"
          />
          <p>Currency</p>
          <p>{country?.currency || "Undefined"}</p>
        </div>
      </section>
    </div>
  );
}

export default CountryDetailPage;
