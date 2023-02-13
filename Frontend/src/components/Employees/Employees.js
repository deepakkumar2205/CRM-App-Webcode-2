import { Container } from "@mui/system";
import axios from "axios";
import * as React from 'react';
import { useEffect , useState } from "react";
import Cardbody from "./Cards";
import API from '../../url'
import { CircularProgress } from "@mui/material";
import Context from "../ContextFold/Context";

export  function Employees() {
  const [employee, setEmployee] =useState([]);
  const context = React.useContext(Context);


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
    setEmployee(data.data)
    context.setBadge(data.data.length )
   })
   .catch((err)=>console.log(err))
  }, [])
  

  return (
    <Container sx={style}>
      {employee.length !==0 ? employee.map((emp)=> <Cardbody emp={emp}/>):<CircularProgress />}
    </Container>
  );
}


