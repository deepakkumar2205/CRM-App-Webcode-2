import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import "yup-phone";
import API from "../url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import "./Profile.css";

export const CreateEmployees = () => {
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
    firstName: yup
      .string()
      .min(3, "Enter a valid first name")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(1, "Enter a valid last name")
      .required("Last name is required"),
    roleId: yup
      .string()
      .min(3, "Select role here")
      .required("Role is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password should be atleast 8 Characters")
      .required("Password is required"),
  });
  const navigate=useNavigate();

  const init = {
    firstName:"",
    lastName:"",
    roleId:"",
    email:"",
    password:""
  }
  const [buttonVal,setButtonval] = useState("Create");
  useEffect(() => {
  }, [])

  //formik
  const  {values,handleChange,errors,resetForm,handleBlur,handleSubmit,touched}=useFormik({
      initialValues:init,
      // enableReinitialize:init,
      validationSchema : userValidationSchema,
      onSubmit:(values)=>{
        console.log(values);
        setButtonval("Loading...")
        fetch(`${API}/users/signup`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          })
          .then((response)=>{
          if(response.status === 401){
            throw new Error(response.statusText)
          }else{
            setButtonval("Create")
            return response.json();
          }
          })
          .then((data) => {
          if(data.message ==='already exist'){
            toast('already exist')
          }else if(data.message === 'password must be at least 8 characters'){
            toast('password must be 8 characters exist')
          }else{
            toast("Created ask the person to verify the email to complete the process")
          }
          resetForm()
          })
          .catch((err)=>{
          toast("Error")
          setButtonval("Create")
          })
      }
      
    })
  return (
    <div style={cont}>
      <Paper className="paperStyle">
       
        <form onSubmit={handleSubmit}>
          <FormControl>
            <div style={{ backgroundColor: "green", margin: 0, padding: 0 }}>
              <h2 style={{ fontFamily: "cursive" }}>Create Employee</h2>
            </div>
            <br />
            <div
              width="200px !important"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: 500, maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                  label="First Name"
                  error={errors.firstName && touched.firstName?"input-error":""}
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
                  onBlur={handleBlur}
                  label="Last Name"
                  error={errors.lastName && touched.lastName ?"input-error":""}
                  helperText={errors.lastName}
                  id="fullWidth"
                />
                <br />
                <br />
                <div style={{justifyContent:"left",alignItems:"left",display:"flex",textAlign:"left"}}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.roleId}
                    onBlur={handleBlur}
                    error={errors.roleId && touched.roleId ?"input-error":""}
                    label="Role"
                    name='roleId'
                    onChange={handleChange}
                  >
                    <MenuItem value={"admin"}>admin</MenuItem>
                    <MenuItem value={"manager"}>Manager</MenuItem>
                    <MenuItem value={"employee"}>Employee</MenuItem>
                  </Select>
                  {errors.roleId && touched.roleId && <FormHelperText error>{errors.roleId}</FormHelperText>}
                </FormControl>
                </div>
                <br />  
                <TextField
                  fullWidth
                  label="E-mail"
                  id="fullWidth"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email && touched.email?"input-error":""}
                  helperText={errors.email}
                />
                <br />
                <br />
                
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  id="fullWidth"
                  error={errors.password && touched.password?"input-error":""}
                  helperText={errors.password}
                />
                <br />
                <br />
                <Button type="submit">{buttonVal}</Button>
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
