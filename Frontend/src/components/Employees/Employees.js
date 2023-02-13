import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react';
import Context from "../ContextFold/Context";
import Cardbody from "./Cards";

export  function Employees() {
 
  const context = React.useContext(Context);


  const style ={
    display:'flex',
    flexWrap:'wrap',
    justifyContent:"center",
    flexDirection:'row',
  }

  console.log(context.sortedEmployees);
  return (
    <Container sx={style}>
      { context.sortedEmployees ==='empty'?<h1>Nothing To Show !</h1> : context.sortedEmployees.length !==0 ? context.sortedEmployees.map((emp,index)=> <Cardbody key={`${index}`} emp={emp}/>):<CircularProgress />}
    </Container>
  );
}


