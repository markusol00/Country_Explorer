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
app.get("/countries/:countryId", async (_request, response) => {
    //Typecasting the countyId to a number
    const countryId = Number(_request.params.countryId);

    const country = await prisma.country.findUnique({
        where: {
            id: countryId
        }
    });
    return response.json(country);

})
// Delete a country from the users List 
app.delete("/my-countries/:id", async (_request, response) => {
    const id =  Number(_request.params.id);
    const deletedCountry = await prisma.userCountry.delete({
        where: {
            id: id
        }
        
    });
    return response.json(deletedCountry);
})
// Add a country to wishlist/visited/ or planning list
app.post("/my-countries", async (_request, response) => {
    const countryId = Number(_request.body.countryId);
    const userId = Number(_request.body.userId);
    const status = String(_request.body.status);
    
    const addedCountry = await prisma.userCountry.create({
        data: {
            userId: userId,
            countryId: countryId,
            status: status
        }
    });
    return response.json(addedCountry);
});

app.patch("/my-countries/:id", async (_request, response) => {
    const id = Number(_request.params.id);

    const status = String(_request.body.status);
     const notes = String(_request.body.notes);

    const updatedCountry = await prisma.userCountry.update({
        where: {
            id: id 
        },
        data: {
            status: status,
            notes: notes,
        },

    });
    return response.json(updatedCountry);
});
//Find the users countries
app.get("/my-countries/:id", async (_request, response) => {
    const id = Number(_request.params.id);
    const myCountries = await prisma.userCountry.findMany({
        where: {
            userId: id
        },
    });
    return response.json(myCountries);
})
//Add a country to the users list.

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
