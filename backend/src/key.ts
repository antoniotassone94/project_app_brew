import {KeyPairSyncResult,generateKeyPairSync} from "crypto";
import {prisma} from "./prisma";
import {JwtKey} from "@prisma/client";

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

export async function getJwtKeys():Promise<JwtKey>{
    let keys:JwtKey|null = await prisma.jwtKey.findFirst();
    if(!keys){
        const genKeys:JwtKeyInterface = generateKeys();
        keys = await prisma.jwtKey.create({
            data: {
                publicKey: genKeys.publicKey,
                privateKey: genKeys.privateKey
            }
        });
    }
    return keys;
}