import { useState, useEffect } from "react";
import type { UserCountry } from "../../Types/UserCountry";
import CountryListCard from "../../Componentss/CountryListCard";
import "./MyCountriesPage.css";
function MyCountriesPage() {
  const [userCountries, setUserCountries] = useState<UserCountry[]>([]);
  const [status, setStatus] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  //FUNCTION FOR STATUS HANDLING CHANGE
  function handleStatusChange(status) {
    const newStatus = status;
    setStatus(status);
    console.log(status);
  }
  useEffect(() => {
    console.log("Status is changed!");
  }, [status]); //dependencyarrayen er hva den skal lytte til for å kjøre kodeen (status)

  useEffect(() => {
    async function fetchUserCountries() {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const response = await fetch("http://localhost:3000/my-countries", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const fetchedUserCountries = await response.json();
        setUserCountries(fetchedUserCountries);
        console.log(userCountries);
      } catch (error) {
        return false;
      }
    }
    fetchUserCountries();
    console.log(userCountries);
  }, []);

  return (
    <>
      <div>
        <nav className="statusFilterbar">
          <ul>
            <li>
              <button
                className={status === "" ? "selected" : ""}
                onClick={() => {
                  handleStatusChange("");
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={status === "visited" ? "selected" : ""}
                onClick={() => {
                  handleStatusChange("visited");
                }}
              >
                Visited
              </button>
            </li>
            <li>
              <button
                className={status === "planning" ? "selected" : ""}
                onClick={() => {
                  handleStatusChange("planning");
                }}
              >
                Planning
              </button>
            </li>
            <li>
              <button
                className={status === "wishlist" ? "selected" : ""}
                onClick={() => {
                  handleStatusChange("wishlist");
                }}
              >
                Wishlist
              </button>
            </li>
          </ul>
        </nav>
        {userCountries.map((country) => {
          if (country.status === status || status === "")
            return (
              <CountryListCard
                key={country.id}
                country={country.country}
                status={country.status}
              />
            );
        })}
      </div>
    </>
  );
}

export default MyCountriesPage;
