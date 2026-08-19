import express from "express";
import { prisma } from "./lib/prisma.js";  
import bcrypt from "bcrypt";
import { register } from "node:module";
import jwt from "jsonwebtoken";
import {authMiddleware} from "./middleware/authMiddleware.js";
import type { AuthRequest } from "./middleware/authMiddleware.js"
import { jwtSecret }  from "./config.js";

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
app.delete("/my-countries/:id", authMiddleware, async (_request : AuthRequest, response) => {
    const userId = _request.userId;
    if(userId == undefined){
        return response.status(401).json({
            message: "user not authenticated"
        })
    }
    const countryId =  Number(_request.params.id);
    const deletedCountry = await prisma.userCountry.delete({
        where: {
            userId_countryId: {
                userId: userId,
                countryId: countryId

            }
            
        }
        
    });
    return response.json(deletedCountry);
})
// Add a country to wishlist/visited/ or planning list
app.post("/my-countries", authMiddleware, async (_request: AuthRequest, response) => {
    const countryId = Number(_request.body.countryId);
    
    const userId = _request.userId;
    if(userId == undefined){
        return response.json(401).json({
            message: "user not authenticated"
        })
    }
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

app.patch("/my-countries/:id", authMiddleware, async (_request: AuthRequest, response) => {
    const userId = _request.userId;
     //check if userId from middleware exists. (To satisfy TypeScript)
    if(userId == undefined){
        return response.json(401).json({
            message: "user not authenticated"
        })
    }

    const countryId = Number(_request.params.id);

    const status = String(_request.body.status);
    const notes = String(_request.body.notes);

    const updatedCountry = await prisma.userCountry.update({
        where: {
            userId_countryId: {
                userId: userId,
                countryId: countryId
            } 
        },
        data: {
            status: status,
            notes: notes,
        },

    });
    return response.json(updatedCountry);
});
//Find the users countries
app.get("/my-countries", authMiddleware, async (_request : AuthRequest, response) => {
    const userId = _request.userId;

    //Checks if userId from middleware exists. (To satisfy TypeScript)
    if (userId == undefined){
        return response.json(401).json({
            message: "user not authenticated"
        })
    }

    const myCountries = await prisma.userCountry.findMany({
        where: {
            userId: userId
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
        return response.status(409).json({
            message: "A user with this email already exists!"
        })
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
         return response.status(201).json({
            id: registerUser.id,
            firstName: registerUser.firstName,
            lastName: registerUser.lastName,
            email: registerUser.email,
         })
    }
    });

//Login to an account
app.post("/auth/login", async (_request, response) => {
    const email = String(_request.body.email);
    const password = String(_request.body.password);

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user){
        return response.status(401).json({
            message: "Wrong email or password"
        });
    } 
    const passwordIsCorrect = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if(!passwordIsCorrect){
        return response.status(401).json({
            message: "Wrong email or password"
        })
    }
    //Creating a access-token
    const accessToken = jwt.sign(
        {userId: user.id},
        jwtSecret,
        {expiresIn: "15m"}
    )
    return response.status(200).json({
        accessToken: accessToken
    });
});

// sjekk
app.get("/test-auth",authMiddleware, async (request, response) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Missing authorization header"
        });
    }

    const parts = authHeader.split(" ");
    const token = parts[1];

      console.log(token);

      if(!token){
        return response.status(401).json({
            message: "No token found"
        })
      }
      const decoded = jwt.verify(
        token,
        "my-secret-key"
      );

      console.log(decoded);

    return response.json({
        message: "Token is valid!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
