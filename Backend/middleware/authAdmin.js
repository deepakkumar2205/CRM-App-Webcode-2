//custom middleware

import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { client } from "../index.js";

export const authAdmin =async (request, response, next) =>{
    try{
        const token = request.header("x-auth-token");
        const id = request.header("_id");
        jwt.verify(token,process.env.SECRET_KEY);
        const result =await client.db("CRM-App").collection("users").findOne({_id:new ObjectId(id)},{projection:{roleId:1}})
        if(result.roleId === 'admin'){
            next(); //if error | next will be skiped
        }
    }catch(err){
        response.status(401).send({
            message: err.message
        })
    }
}; 