import express,{Router} from "express";
import {prisma} from "./prisma";
import {JwtKey,User} from "@prisma/client";
import {compareSync,hashSync} from "bcrypt";
import jwt,{JwtPayload} from "jsonwebtoken";
import {getJwtKeys} from "./key";
import {PassThrough} from "stream";
import cors from "cors"

const auth:Router = express.Router();

// Function for verification email and password user
async function verifyUser(email:string,password:string):Promise<User|false>{
    const user:User|null = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(!user){
        return false;
    }
    if(!compareSync(password,user.password)){
        return false;
    }
    return user;
}

function getExpirationTime(minutes:number):number{
    const now:number = Math.trunc(new Date().getTime() / 1000);
    return now + (minutes * 60);
}

function checkJwt(accessToken:string,token:JwtKey):boolean{
    const payload:string|jwt.JwtPayload = jwt.verify(accessToken,token.privateKey);
    if(!payload){
        return true;
    }
    return false;
}

async function generateJwt(user:User):Promise<string>{
    const payload = {
        aud:"access",
        exp:getExpirationTime(60),
        sub:user.email,
        userId:user.id,
        email:user.email
    }
    const {privateKey} = await getJwtKeys();
    return jwt.sign(payload,privateKey,{algorithm:"RS256"});
}

auth.post("/login", async(req,res) => {
    const {email,password} = req.body;
    const user:User|false = await verifyUser(email,password);
    if(!user){
        return res.status(403).send({message:"Invalid authentication.",check:false});
    }
    const token:string = await generateJwt(user);
    return res.status(200).send({
        message: `Hello ${user.name}`,
        check:true,
        accessToken:token,
    })
})

auth.post("/register", async(req,res) => {
    const {name,email,password} = req.body;
    const passwordHash:string = hashSync(password,5);
    let user:User;
    try{
        user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            }
        });
        return res.status(201).send({user:user,message:"User created correctly.",check:true});
    }catch{
        return res.status(401).send({message:"Error while creating the user.",check:false});
    }
})

auth.get("/users", async(req,res) => {
    try{
        const users:User[] = await prisma.user.findMany();
        return res.status(200).send({users:users,check:true});
    }catch{
        return res.status(404).send({message:"User not found.",check:false});
    }
})

export {auth}