import {KeyPairSyncResult,generateKeyPairSync} from "crypto";
import {prisma} from "./prisma";
import {JwtKey, User} from "@prisma/client";
import dotenv from "dotenv";
import jwt,{JwtPayload} from "jsonwebtoken";

dotenv.config();

export interface JwtKeyInterface{
    privateKey: string;
    publicKey: string;
}

function getExpirationTime(minutes:number):number{
    const now: number = Math.trunc(new Date().getTime() / 1000);
    return now + (minutes * 60);
}

function generateKeys():JwtKeyInterface{
    const keys:KeyPairSyncResult<string,string> = generateKeyPairSync("rsa",{
        modulusLength: 4096,
        publicKeyEncoding: {
            type:"spki",
            format:"pem"
        },
        privateKeyEncoding: {
            type:"pkcs8",
            format:"pem"
        },
    });
    return keys;
}

async function getToken(user:User):Promise<JwtKey>{
    const actualKeys:JwtKey|null = await prisma.jwtKey.findUnique({
        where:{
            userId:user.id
        }
    });
    if(actualKeys){
        try{
            const payload:string|JwtPayload = jwt.verify(actualKeys.accessToken,actualKeys.privateKey);
            if(!payload || typeof payload === "string"){
                await prisma.jwtKey.delete({
                    where:{
                        userId:user.id
                    }
                });
            }
        }catch(error){
            await prisma.jwtKey.delete({
                where:{
                    userId:user.id
                }
            });
        }
    }
    let keys:JwtKey|null = await prisma.jwtKey.findUnique({
        where:{
            userId:user.id
        }
    });
    if(!keys){
        const genKeys:JwtKeyInterface = generateKeys();
        const payload = {
            aud: "access",
            exp: getExpirationTime(60),
            sub: user.email,
            userId: user.id,
            email: user.email
        }
        const accessToken:string = jwt.sign(payload,<string>process.env.JWT_PRIVATE,{algorithm:"HS256"});
        keys = await prisma.jwtKey.create({
            data: {
                publicKey: genKeys.publicKey,
                privateKey: <string>process.env.JWT_PRIVATE,
                accessToken:accessToken,
                userId:user.id
            }
        });
    }
    return keys;
}

export {getToken}