import { Link } from "react-router";
import type { Country } from "../Types/Country";
import "./CountryListCard.css";

type CountryListCardProps = {
  country: Country;
  status?: string; //added
};

function CountryListCard({ country, status }: CountryListCardProps) {
  return (
    <>
      <div className="card">
        <section className="status-container">
          <div className="country-information-container">
            <span className="flagicon">{country.flag}</span>
            <div className="countryinfo">
              <h2 className={country.name.length > 15 ? "long-name" : ""}>
                {country.name}
              </h2>
              <p className="continent">{country.continent}</p>
            </div>
          </div>
          <p className={`status ${status}`}>{status}</p>
        </section>
        <Link to={`/countries/${country.id}`} className="linkButton">
          Vis
        </Link>
      </div>
    </>
  );
}
export default CountryListCard;
