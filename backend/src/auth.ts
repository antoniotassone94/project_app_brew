import express,{Router} from "express";
import {prisma} from "./prisma";
import {JwtKey,User} from "@prisma/client";
import {compareSync,hashSync} from "bcrypt";
import jwt,{JwtPayload} from "jsonwebtoken";
import {getToken} from "./key";
import dotenv from "dotenv";
import multer,{Multer} from "multer";
import fs from "fs";

dotenv.config();
const upload:Multer = multer({dest:"uploads/images/"});
const auth:Router = express.Router();

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

function checkJwt(accessToken:string):JwtPayload|null{
    try{
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
    const jwtKeys:JwtKey = await getToken(user);
    return jwtKeys.accessToken;
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

auth.post("/uploadavatar",upload.single("avatar"),async(req,res) => {
    const {accessToken} = req.body;
    const avatar:Express.Multer.File|undefined = req.file;
    if(!avatar){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(!accessToken){
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof accessToken !== "string"){
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(400).send({message:"Bad request, type of the field is incorrect.",check:false});
    }
    if(accessToken === ""){
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(400).send({message:"Bad request, field is empty.",check:false});
    }
    if(!avatar.filename || avatar.filename === ""){
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(400).send({message:"The name of the file isn't valid.",check:false});
    }
    if(avatar.size <= 0 || avatar.size > 5242880){ //5242880 byte = 5 megabyte
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(400).send({message:"The size of the file isn't valid.",check:false});
    }
    if(!avatar.mimetype || (avatar.mimetype !== "image/jpg" && avatar.mimetype !== "image/jpeg" && avatar.mimetype !== "image/png")){
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(400).send({message:"The type of the file isn't valid.",check:false});
    }
    const payload:JwtPayload|null = checkJwt(accessToken);
    if(!payload){
        fs.rm(avatar.path,() => {
            console.log("Temporary file deleted.");
        })
        return res.status(401).send({message:"Token not valid",check:false});
    }
    const userId:string = payload.userId;
    const extension:string = avatar.originalname.substring(avatar.originalname.length - 3);
    const filename:string = userId + "." + extension;
    const destinationPath:string = avatar.destination + filename;
    const sourcePath:string = avatar.path;
    fs.copyFile(sourcePath,destinationPath,() => {
        fs.rm(sourcePath,async() => {
            const user:User|null = await prisma.user.update({
                where:{
                    id:userId
                },
                data:{
                    avatar:filename
                }
            })
            if(!user){
                return res.status(500).send({message:"Internal server error",check:false});
            }
            return res.status(200).send({filename:filename,message:"Avatar updated correctly.",check:true});
        });
    });
})

auth.get("/avatar/:filename",(req,res) => {
    const {filename} = req.params;
    const directory:string = __dirname.substring(0,__dirname.length - 3);
    res.sendFile(directory + "uploads\\images\\" + filename);
})

export {auth}