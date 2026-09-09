import { useEffect, useState } from "react";
import type { Country } from "../Types/Country";
import CountryListCard from "../Componentss/CountryListCard";
function CountryListPage() {
  const [count, setCount] = useState(0);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("http://localhost:3000/countries");
        const fetchedCountries = await response.json();
        console.log(fetchedCountries);
        setCountries(fetchedCountries);
      } catch (error) {
        return false;
      }
    }
    fetchCountries();
  }, []);
  return (
    <div>
      <h1>Land</h1>
      <p>Utforsk alle verdens land</p>

      <div>
        {countries.map((country) => {
          return <CountryListCard country={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}

export default CountryListPage;
