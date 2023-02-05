import express from 'express';
import { auth } from '../middleware/auth.js';
import { getprofile, updataProfile } from '../services/dashboard.profie.services.js';
import _ from 'underscore';
const router = express.Router();


//geting profile data to show in dashboard.
router.post('/getprofile',auth,express.json(),async function(request, response){
    const {_id}= request.body;
    const profileData =await getprofile(_id);
    const omited=_.omit(profileData,"password","emailVerified");
    response.send(omited)
})

router.post('/saveProfile',auth,express.json(),async function(request, response){
    const data = request.body;
    const result = await updataProfile(data);
    response.send(result)
})

export default router ;