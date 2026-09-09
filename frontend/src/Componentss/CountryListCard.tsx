import { Link } from "react-router";
import type { Country } from "../Types/Country";
import "./CountryListCard.css";

type CountryListCardProps = {
  country: Country;
};

function CountryListCard({ country }: CountryListCardProps) {
  return (
    <>
      <div className="card">
        <section>
          <span className="flagicon">{country.flag}</span>
          <div>
            <h2>{country.name}</h2>
            <p>{country.continent}</p>
          </div>
        </section>
        <Link to={`/countries/${country.id}`} className="linkButton">
          Vis
        </Link>
      </div>
    </>
  );
}
export default CountryListCard;
