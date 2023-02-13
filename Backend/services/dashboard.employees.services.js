import { ObjectId } from 'mongodb';
import { client } from '../index.js';
import _ from 'underscore';

export async function getEmployeesAll(_id) {
    return client.db("CRM-App").collection("users").find({},{projection:{firstName:1,imageUrl:1,roleId:1,gender:1}}).toArray();          
}

