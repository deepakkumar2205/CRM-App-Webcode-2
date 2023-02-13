import express from 'express';
import { auth } from '../middleware/auth.js';
import { getprofile, updataProfile } from '../services/dashboard.profie.services.js';
import _ from 'underscore';
import { getEmployeesAll } from '../services/dashboard.employees.services.js';
const router = express.Router();


//geting employees data to show in dashboard.
router.get('/getemployees',auth,express.json(),async function(request, response){
    const data =await getEmployeesAll();
    response.send(data)
})


export default router ;