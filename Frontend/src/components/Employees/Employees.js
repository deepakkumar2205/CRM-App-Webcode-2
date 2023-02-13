import { Container } from "@mui/system";
import axios from "axios";
import * as React from 'react';
import { useEffect , useState } from "react";
import Cardbody from "./Cards";
import API from '../../url'
import { CircularProgress } from "@mui/material";

export  function Employees() {
  const [employee, setEmployee] =useState([]);

  const style ={
    display:'flex',
    flexWrap:'wrap',
    justifyContent:"center",
    flexDirection:'row',
  }

  useEffect(() => {
   axios({
    url:`${API}/dashboard/getemployees`,
    method:'get',
    headers:{
      'x-Auth-token':localStorage.getItem("x-Auth-token")
    }
   }).then((data)=>{
    console.log(data.data)
    setEmployee(data.data)
   })
   .catch((err)=>console.log(err))
  }, [])
  

  return (
    <Container sx={style}>
      {employee.length !==0 ? employee.map((emp)=> <Cardbody emp={emp}/>):<CircularProgress />}
    </Container>
  );
}


