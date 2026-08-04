import express from "express";
import { prisma } from "./lib/prisma.js";   

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_request, response) => {
    response.json({
        message: "Country Explorer API is running",
    });
});
app.get("/countries", async (_request, response) => {
    const countries = await prisma.country.findMany();

    response.json(countries);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
