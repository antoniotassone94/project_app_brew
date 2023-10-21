import express from "express";
import cors from "cors";
import {auth} from "./auth";

const PORT = process.env.PORT || 4000;
const server = express();

server.use(cors());
server.use(express.json());
server.use("/auth",auth);

server.get("/",(req,res) => res.send("Hello world!"));

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});