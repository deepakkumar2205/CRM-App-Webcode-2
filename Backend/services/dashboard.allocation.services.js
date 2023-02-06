import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function getUsers() {
    const data= client.db("CRM-App").collection("users").find({},{projection:{firstName:1,email:1,roleId:1}});        
    return data.toArray()
}

export async function updateRoleOfUser(data) {
    const result= client.db("CRM-App").collection("users").updateOne({_id:new ObjectId(data._id)},{$set:{roleId:data.roleId}});
    return result
}

