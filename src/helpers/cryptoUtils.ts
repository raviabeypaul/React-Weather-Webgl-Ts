import jwt from 'jsonwebtoken';
import { CONFIG } from "config";

export const createJWT = async (data: any) => {
    console.log("inside createJWT => ", data);
    const signOptions = {
        expiresIn: 3600,
        algorithm: "HS256"
    };

    try {
        //console.log( data, CONFIG.JWT_SECRET(), signOptions)
        const token = await jwt.sign(data , await CONFIG.JWT_SECRET(), signOptions);
        console.log("Encoded token => ", token);
        return token;
    } catch (err) {
        console.log('Error => ', err.message);

        if (err.name === 'TokenExpiredError') {
            return {"error" : "Auth_Expired"}
            //console.log("AUTH_EXPIRED");
        } else if (err.name === 'JsonWebTokenError') {
            return {"error" : "JWT_ERROR"}
            //console.log("JWT_ERROR");
        } else if (err.name === 'NotBeforeError') {
            return {"error" : "JWT_NOT_ACTIVE"}
            //console.log("JWT_NOT_ACTIVE");
        } else {
            return {"error" : "ERR_ON"}
            //console.log("ERR_ON");
        }
    }
}

export const decodeJWT = async (token: any) => {
    console.log("inside decodeJWT");
    try {
        const decodedJWT = await jwt.decode(token);
        console.log("Decoded token => ", decodedJWT);
        return decodedJWT;
    } catch (err) {
        console.log('Error => ', err.message);

        if (err.name === 'TokenExpiredError') {
            return {"error" : "Auth_Expired"}
            //console.log("AUTH_EXPIRED");
        } else if (err.name === 'JsonWebTokenError') {
            return {"error" : "JWT_ERROR"}
            //console.log("JWT_ERROR");
        } else if (err.name === 'NotBeforeError') {
            return {"error" : "JWT_NOT_ACTIVE"}
            //console.log("JWT_NOT_ACTIVE");
        } else {
            return {"error" : "ERR_ON"}
            //console.log("ERR_ON");
        }
    }
}

export const verifyJWT = async (token: any) => {
    console.log("inside verifyJWT => ", token);
    const verifyOptions = {
        expiresIn: 3600,
        algorithm: ["HS256"]
    };

    try {
        const decoded = await jwt.verify(token, await CONFIG.JWT_SECRET(), verifyOptions);
        return decoded;
    } catch (err) {
        console.log('Error => ', err.message);

        if (err.name === 'TokenExpiredError') {
            return {"error" : "Auth_Expired"}
            //console.log("AUTH_EXPIRED");
        } else if (err.name === 'JsonWebTokenError') {
            return {"error" : "JWT_ERROR"}
            //console.log("JWT_ERROR");
        } else if (err.name === 'NotBeforeError') {
            return {"error" : "JWT_NOT_ACTIVE"}
            //console.log("JWT_NOT_ACTIVE");
        } else {
            return {"error" : "ERR_ON"}
            //console.log("ERR_ON");
        }
    }
}