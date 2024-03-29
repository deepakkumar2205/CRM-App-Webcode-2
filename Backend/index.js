import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import usersRouter from './routes/users.router.js';
import profileRouter from './routes/dashboard.profile.router.js'
import allocationRouter from './routes/dashboard.allocation.router.js'
import employeeRouter from './routes/dashboard.employees.router.js'
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});


// const MONGO_URL = 'mongodb://127.0.0.1';
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const client = new MongoClient(MONGO_URL); //dial a number.
await client.connect(); //call  //previous handshake is happening
console.log("mongo is connected !!!");

app.use('/users',usersRouter) ;

//this route is for dashboard/profile
app.use("/dashboard", profileRouter);

//this route is for allocation page 
app.use("/dashboard", allocationRouter);

//this route is for allocation page 
app.use("/dashboard", employeeRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
