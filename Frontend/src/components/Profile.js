import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'

export const Profile = () => {
    let cont ={display:"flex",alignContent:"center",justifyContent:"center"}
    let paperCont ={width:"700px"}
    let img = {border:"1px solid black",borderRadius:"50%",width:"200px",verticalAlign:"middle",height:"200px"}
  return (
    <div style={cont}>
        <Paper style={paperCont}>
          <FormControl>
            <div style={{backgroundColor:"green" ,margin:0,padding:0}}>
               <h2 style={{fontFamily:"cursive"}}>Profile</h2>
            </div>
            <br/>
            <div width='200px !important' style={{display:"flex",justifyContent:"center"}}>
          <Box sx={{width: 500, maxWidth: '100%'}} >
           <img src='https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg' style={img}></img>
           
           <h1>Role : Admin</h1>
           
          <TextField fullWidth label="Image Url" id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="First Name" id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="Last Name" id="fullWidth" />
          <br/><br/>
          <div style={{justifyContent:"left",display:"flex"}}>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          </div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <TextField fullWidth label="E-mail" id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="Phone Number" id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="Address" id="fullWidth" />
          <br/><br/>
          <Button>Update</Button>
          <br/><br/>
          </Box>
          </div>
          </FormControl>
        </Paper>
    </div>
  )
}
