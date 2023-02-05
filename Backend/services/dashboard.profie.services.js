import { ObjectId } from 'mongodb';
import { client } from '../index.js';
import _ from 'underscore';

export async function getprofile(_id) {
    return client.db("CRM-App").collection("users").findOne({_id:new ObjectId(_id)});          
}

export async function updataProfile(data) {
    const updatedData = _.omit(data,"_id")
    return client.db("CRM-App").collection("users").updateOne({_id:new ObjectId(data._id)},{$set:updatedData});          
}
