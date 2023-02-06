import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import API from '../../url';
import {toast} from 'react-toastify';

export  function Allocation() {
  const [tableData,setTableData ] = React.useState([]);
  const [render, setRender]= React.useState(true);
  let storageArray = [];

  const compare =(obj) =>{
    var flag = true ;
    let newArray = storageArray.map((e)=>{
      if(e._id === obj._id){
        flag = false ;
        return obj
      }else{
        return e
      }
    })
    if(flag){
      newArray.push(obj)
    }
    storageArray= newArray
    if(obj.roleId ==='none'){
      storageArray = storageArray.filter((e)=>e._id !== obj._id)
    }
  }

const handleSubmit =(id)=>{
  let data ;
  storageArray.forEach((e)=>{
    if(e._id === id){
      data = e
    }
  })
  if(data){
    axios({
      method:'post',
      url:`${API}/dashboard/updateRoleOfUser`,
      data:data,
      headers:{
        'x-Auth-token':localStorage.getItem("x-Auth-token"),
        'roleId':localStorage.getItem("roleId"),
        '_id':localStorage.getItem("_id")
      }
    }).then(data=>{
      if(data.data.modifiedCount === 0 ){
        toast("upto date")
      }else{
        toast("Role is updated successfully")
        setRender(render ? false: true)
      }
    })
      .catch((err)=>console.log(err))
  }else{
   toast("select data first")
  }

}

useEffect(() => {
    axios({
        method:"get",
        url:`${API}/dashboard/getusersforprofile`,
        headers:{
            'x-Auth-token':localStorage.getItem("x-Auth-token"),
            'roleId':localStorage.getItem("roleId"),
            '_id':localStorage.getItem("_id")
        }
    }).then((data)=>{
      setTableData(data.data)
    })
      .catch((err)=>console.log(err))
}, [render])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell align="right">
              <b>E-mail</b>
            </TableCell>
            <TableCell align="right">
              <b>Current Role</b>
            </TableCell>
            <TableCell align="right">
              <b>Select Role To Change</b>
            </TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.roleId}</TableCell>
              <TableCell align="right">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl>
                    <NativeSelect
                      defaultValue={"none"}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e)=>compare({roleId:e.target.value,_id:row._id})}
                    >
                      <option value={"none"}></option>
                      <option value={"admin"}>admin</option>
                      <option value={"manager"}>Manager</option>
                      <option value={"employee"}>Employee</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Button onClick={()=>handleSubmit(row._id)}>Change</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}