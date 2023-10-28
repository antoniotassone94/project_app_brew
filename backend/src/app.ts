import express,{Router} from "express";
import {prisma} from "./prisma";
import {Beer,User} from "@prisma/client";
import {JwtPayload} from "jsonwebtoken";
import {checkJwt} from "./auth";

const app:Router = express.Router()

app.put("/create",async(req,res) => {
    const {accessToken,brewingName,ogValue,fgValue,alcohol} = req.body;
    if(!accessToken || !brewingName || !ogValue || !fgValue || !alcohol){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string" || typeof brewingName !== "string" || typeof ogValue !== "number" || typeof fgValue !== "number" || typeof alcohol !== "number"){
        return res.status(400).send({message:"Bad request, types of some fields are incorrect.",check:false});
    }
    if(accessToken === "" || brewingName === "" || ogValue <= 0 || fgValue <= 0 || alcohol <= 0){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;
    const user:User|null = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    if(!user){
        return res.status(401).send({message:"User not valid",check:false});
    }
    const beer:Beer|null = await prisma.beer.create({
        data:{
            brewingName:brewingName,
            ogValue:ogValue,
            fgValue:fgValue,
            alcohol:alcohol,
            userId:user.id
        }
    });
    if(!beer){
        return res.status(500).send({message:"Internal server error.",check:false});
    }
    return res.status(201).send({message:"Beer created correctly.",check:true});
})

app.delete("/delete/:beerId",async(req,res) => {
    const {accessToken} = req.body;
    const {beerId} = req.params;
    if(!accessToken || !beerId){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string" || typeof beerId !== "string"){
        return res.status(400).send({message:"Bad request, types of some fields are incorrect.",check:false});
    }
    if(accessToken === "" || beerId === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;
    const user:User|null = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    if(!user){
        return res.status(401).send({message:"User not valid",check:false});
    }
    const beer:Beer|null = await prisma.beer.delete({
        where:{
            id:beerId
        }
    });
    if(!beer){
        return res.status(500).send({message:"Internal server error.",check:false});
    }
    return res.status(200).send({message:"Beer deleted correctly.",check:true});
})

app.post("/get/:beerId",async(req,res) => {
    const {accessToken} = req.body;
    const {beerId} = req.params;
    if(!accessToken || !beerId){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string" || typeof beerId !== "string"){
        return res.status(400).send({message:"Bad request, types of some fields are incorrect.",check:false});
    }
    if(accessToken === "" || beerId === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;
    const user:User|null = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    if(!user){
        return res.status(401).send({message:"User not valid",check:false});
    }
    const beer:Beer|null = await prisma.beer.findFirst({
        where:{
            id:beerId
        }
    });
    if(!beer){
        return res.status(404).send({message:"Beer not found.",check:false});
    }
    return res.status(200).send({beer:beer,message:"Beer found.",check:true});
});

app.post("/getAll",async(req,res) => {
    const {accessToken} = req.body;
    if(!accessToken){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string"){
        return res.status(400).send({message:"Bad request, types of some fields are incorrect.",check:false});
    }
    if(accessToken === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;
    const user:User|null = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    if(!user){
        return res.status(401).send({message:"User not valid",check:false});
    }
    const beers:Beer[]|null = await prisma.beer.findMany({
        where:{
            userId:user.id
        }
    });
    if(!beers || beers.length <= 0){
        return res.status(404).send({message:"Beers not found.",check:false});
    }
    return res.status(200).send({beers:beers,message:"Beers found.",check:true});
})

export {app}