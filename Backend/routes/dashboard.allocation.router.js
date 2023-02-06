import express from 'express';
import { getUsers , updateRoleOfUser } from '../services/dashboard.allocation.services.js';
import _ from 'underscore';
import { authAdmin } from '../middleware/authAdmin.js';

const router = express.Router();


//geting profile data to show in dashboard.
router.get('/getusersforprofile',authAdmin,express.json(),async function(request, response){
   const wholeDataOfUsers = await getUsers();
   response.send(wholeDataOfUsers)
})

router.post('/updateRoleOfUser',authAdmin,express.json(),async function(request, response){
    const data = request.body;
    const resp = await updateRoleOfUser(data);
    response.send(resp)
})


export default router ;