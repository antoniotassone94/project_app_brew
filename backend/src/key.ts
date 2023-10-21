import {KeyPairSyncResult,generateKeyPairSync} from "crypto";
import {prisma} from "./prisma";
import {JwtKey} from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

export interface JwtKeyInterface{
    privateKey: string;
    publicKey: string;
}

function generateKeys():JwtKeyInterface{
    const keys:KeyPairSyncResult<string,string> = generateKeyPairSync('rsa', {
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

export async function getJwtKeys(userId:string):Promise<JwtKey>{
    let keys:JwtKey|null = await prisma.jwtKey.findUnique({
        where:{
            userId:userId
        }
    });
    if(!keys){
        const genKeys:JwtKeyInterface = generateKeys();
        keys = await prisma.jwtKey.create({
            data: {
                publicKey: genKeys.publicKey,
                privateKey: <string>process.env.JWT_PRIVATE,
                userId:userId
            }
        });
    }
    return keys;
}