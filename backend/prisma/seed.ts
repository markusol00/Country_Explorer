import { prisma } from "../src/lib/prisma.js";
import { readFile } from "node:fs/promises"

type RawCountry = {
    cca2: string;
    name: {
        common: string;
    };
    capital?: string[];
    population?: number;
    currencies?: Record<
    string,
    {
      name: string;
      symbol?: string;
    }
  >;
  flag?: string;
  region: string;
}

async function main() {
    const filePath = new URL("./data/countries.json", import.meta.url);

    const fileContent = await readFile(filePath, "utf-8");

    const countries: RawCountry[] = JSON.parse(fileContent);

    const firstCountry = countries[0];

    if(!firstCountry){
        throw new Error("No countries found in the JSON file");
    }

    const countriesToSeed = countries.map((country) => ({
        code: country.cca2,
        name: country.name.common,
        capital: country.capital?.[0] ?? null,
        population: country.population ?? null,
        currency: Object.keys(country.currencies ?? {})[0] ?? null,
        flag: country.flag ?? null,
        continent: country.region,
    }));

    const countryToSeed = countriesToSeed[0];
    if (!countryToSeed) {
  throw new Error("Fant ingen land å lagre");
}

    await prisma.country.upsert({
        where: {
            code: countryToSeed.code,
        },
        update: countryToSeed,
        create: countryToSeed,
    });
}

main(); 
