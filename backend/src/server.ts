import express from "express";
import { prisma } from "./lib/prisma.js";  
import bcrypt from "bcrypt";
import { register } from "node:module";

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
//register an account
app.post("/auth/register", async (_request,response) =>{
    const firstName = String(_request.body.firstName);
    const lastName = String(_request.body.lastName);
    const mail = String(_request.body.mail);
    const password = String(_request.body.password);

    const hashedPassword = await bcrypt.hash(password, 10)
    //Get the user if there is an existing user with the same mail-adress
    const userExists = await prisma.user.findUnique({
        where: {
            email: mail
        }
    });
    if(userExists){
        console.log('User related to this mail already exists!')
    }
    else{
        const registerUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: mail,
                passwordHash: hashedPassword
            }
        });
         return response.json(registerUser)
    }
    });


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
