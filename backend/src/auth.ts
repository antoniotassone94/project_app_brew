import express,{Router} from "express";
import {prisma} from "./prisma";
import {JwtKey,User} from "@prisma/client";
import {compareSync,hashSync} from "bcrypt";
import jwt,{JwtPayload} from "jsonwebtoken";
import {getJwtKeys} from "./key";
import dotenv from "dotenv";

dotenv.config();
const auth: Router = express.Router();

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
    const now: number = Math.trunc(new Date().getTime() / 1000);
    return now + (minutes * 60);
}

function checkJwt(accessToken:string):JwtPayload|null{
    try {
        const payload:string|JwtPayload = jwt.verify(accessToken,<string>process.env.JWT_PRIVATE);
        if(!payload){
            return null;
        }
        if(typeof payload === "string"){
            return null;
        }
        return <JwtPayload>payload;
    }catch(error){
        return null;
    }
}

async function generateJwt(user:User):Promise<string>{
    const payload = {
        aud: "access",
        exp: getExpirationTime(60),
        sub: user.email,
        userId: user.id,
        email: user.email
    }
    const {privateKey} = await getJwtKeys(user.id);
    return jwt.sign(payload,privateKey,{algorithm:"HS256"});
}

auth.post("/login",async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(406).send({message:"Invalid authentication.",check:false});
    }
    if(typeof email !== "string" || typeof password !== "string"){
        return res.status(400).send({message:"Invalid authentication.",check:false});
    }
    if(email === "" || password === ""){
        return res.status(400).send({message:"Invalid authentication.",check:false});
    }
    const user:User|false = await verifyUser(email,password);
    if(!user){
        return res.status(403).send({message:"Invalid authentication.",check: false});
    }
    const token:string = await generateJwt(user);
    return res.status(200).send({
        message:"User login done.",
        check:true,
        accessToken:token,
    })
})

auth.post("/register",async(req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof name !== "string" || typeof email !== "string" || typeof password !== "string"){
        return res.status(400).send({message:"Bad request, type of some fields is incorrect.",check:false});
    }
    if(name === "" || email === "" || password === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const passwordHash: string = hashSync(password, 5);
    try{
        const user:User = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash,
                avatar:""
            },
            include:{
                jwtKey:true
            }
        });
        if(!user){
            return res.status(500).send({message:"User registration error.",check:false});
        }
        return res.status(201).send({message:"User created correctly.",check:true});
    }catch{
        return res.status(401).send({message:"User registration error.",check:false});
    }
})

auth.post("/user",async(req,res) => {
    const {accessToken} = req.body;
    if(!accessToken){
        return res.status(406).send({message:"Missing required field.",check:false});
    }
    if(typeof accessToken !== "string"){
        return res.status(400).send({message:"Bad request, type of the field is incorrect.",check:false});
    }
    if(accessToken === ""){
        return res.status(400).send({message:"Bad request, field is empty.",check:false});
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
    return res.status(200).send({name:user.name,email:user.email,avatar:user.avatar,check:true});
})

auth.post("/changepassword",async(req,res) => {
    const {accessToken,newPassword,repeatPassword} = req.body;
    if(!accessToken || !newPassword || !repeatPassword){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string" || typeof newPassword !== "string" || typeof repeatPassword !== "string"){
        return res.status(400).send({message:"Bad request, type of some fields is incorrect.",check:false});
    }
    if(accessToken === "" || newPassword === "" || repeatPassword === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    if(newPassword !== repeatPassword){
        return res.status(400).send({message:"Bad request, newPassword and repeatPassword are different.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;
    const passwordHash:string = hashSync(newPassword,5);
    const user:User|null = await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            password:passwordHash
        }
    });
    if(!user){
        return res.status(500).send({message:"Internal server error.",check:false});
    }
    return res.status(200).send({message:"Password of the user changed correctly.",check:true});
})

auth.post("/uploadavatar",async(req,res) => {
    const {accessToken,avatar} = req.body;

    console.log("typeof avatar: " + typeof avatar,"avatar: " + avatar,"accessToken: " + accessToken);

    if(!accessToken || !avatar){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string"){
        return res.status(400).send({message:"Bad request, type of the field is incorrect.",check:false});
    }
    if(accessToken === ""){
        return res.status(400).send({message:"Bad request, field is empty.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;

    console.log("userId: " + userId);
    return res.status(500).send({message:"Internal server error",check:false});

    /*const newAvatar:Avatar|null = await prisma.avatar.create({
        data:{
            avatar:avatar,
            userId:userId
        },
        include:{
            user:true
        }
    })
    if(!newAvatar){
        return res.status(500).send({message:"Internal server error",check:false});
    }
    return res.status(201).send({message:"Avatar created correctly.",check:true});*/
})

export {auth}