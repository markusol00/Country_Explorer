import { prisma } from "../src/lib/prisma";

async function main() {
    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca2,name,capital,population,currencies,flags,region"
    );
}

main(); 
