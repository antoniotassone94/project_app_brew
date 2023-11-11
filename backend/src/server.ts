import express from "express";
import cors from "cors";
import {auth} from "./auth";
import {app} from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT || 4000;
const server = express();

server.use(cors());
server.use(express.json());
server.use("/auth",auth);
server.use("/app",app);

server.get("/",(req,res) => res.send("Hello world!"));

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});