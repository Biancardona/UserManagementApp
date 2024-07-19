import express from "express";
import conectDB from "./config/db.js";
import users from "./routes/users.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());

conectDB()
const allowedDomains = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedDomains.indexOf(origin) !== -1 || !origin) {
            //Request oorigin is allowed
            callback(null, true);
        } else {
            callback(new Error("Not allowed CORS"));
        }
    },
};
//Allow express use CorsOptions
app.use(cors(corsOptions));

app.use("/api/users", users);


const port = 4000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})