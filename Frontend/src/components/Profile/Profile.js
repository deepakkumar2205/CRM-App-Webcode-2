import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { useFormik } from 'formik';
import React from "react";
import * as yup from "yup";
import "yup-phone";
import maleavatar1 from "../../assets/maleavatar.svg";
import "./Profile.css";

export const Profile = () => {
  //some styles below:
  let cont = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  };
  let img = {
    border: "1px solid black",
    borderRadius: "50%",
    width: "200px",
    verticalAlign: "middle",
    height: "200px",
  };

  //yup validation
  const userValidationSchema = yup.object().shape({
    imageUrl: yup
      .string()
      .min(10, "Enter a valid URL")
      .required("Image url is required"),
    firstName: yup
      .string()
      .min(3, "Enter a valid first name")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(3, "Enter a valid last name")
      .required("Last name is required"),
    gender: yup.string().min(2, "Select Gender").required("gender is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    phone: yup.string().phone("IN").required("Enter a valid Phone number"),
    address: yup
      .string()
      .min(10, "Enter a valid  address")
      .required("Address is required"),
  });

  //formik
  const  {values,handleChange,errors,handleBlur,handleSubmit}=useFormik({
      initialValues:{
        imageUrl:maleavatar1,
        firstName:"",
        lastName:"",
        gender:"undefined",
        email:"",
        phone:"",
        address:""
      },
      validationSchema : userValidationSchema,
      onSubmit:(values)=>{
        console.log(values);
      }
      
    })
  return (
    <div style={cont}>
      <Paper className="paperStyle">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <div style={{ backgroundColor: "green", margin: 0, padding: 0 }}>
              <h2 style={{ fontFamily: "cursive" }}>Profile</h2>
            </div>
            <br />
            <div
              width="200px !important"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: 500, maxWidth: "100%" }}>
                <img src={values.imageUrl} alt='Phone' style={img}></img>
                <h1>Role : Admin</h1>
                <TextField
                  fullWidth
                  label="Image Url"
                  name="imageUrl"
                  onChange={handleChange}
                  value={values.imageUrl}
                  error={errors.imageUrl ?"input-error":""}
                  helperText={errors.imageUrl}
                  id="fullWidth"
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                  label="First Name"
                  error={errors.firstName ?"input-error":""}
                  helperText={errors.firstName}
                  id="fullWidth"
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  label="Last Name"
                  error={errors.lastName ?"input-error":""}
                  helperText={errors.lastName}
                  id="fullWidth"
                />
                <br />
                <br />
                <div style={{ justifyContent: "left", display: "flex" }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                </div>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  error={true}
                  helperText={errors.gender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                  <FormControlLabel
                    value="undefined"
                    control={<Radio />}
                    label="Not Choose"
                  />
                </RadioGroup>
                <TextField
                  fullWidth
                  label="E-mail"
                  id="fullWidth"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email ?"input-error":""}
                  helperText={errors.email}
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  id="fullWidth"
                  error={errors.phone ?"input-error":""}
                  helperText={errors.phone}
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  id="fullWidth"
                  error={errors.address ?"input-error":""}
                  helperText={errors.address}
                />
                <br />
                <br />
                <Button type="submit">Update</Button>
                <br />
                <br />
              </Box>
            </div>
          </FormControl>
        </form>
      </Paper>
    </div>
  );
};
