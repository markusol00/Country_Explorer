import { prisma } from "../src/lib/prisma";
import { readFile } from "node:fs/promises"

type RawCountry = {
    cca2: string;
    name: {
        common: string;
    };
    capital?: string[];
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
        code: firstCountry.cca2,
        name: firstCountry.name.common,
        capital: firstCountry.capital?.[0] ?? null,
        population: 0, 
        currency: Object.keys(firstCountry.currencies ?? {})[0] ?? null,
        flag: firstCountry.flag ?? null,
        continent: firstCountry.region,
    }));


/*
    for(let country of countries){
        await prisma.country.create({
            data: country
            cou

        })

    }
   
*/
}

main(); 
