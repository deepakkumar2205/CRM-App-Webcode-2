import { Button, CircularProgress } from '@mui/material';
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
import * as React from 'react';

export function AllocationTableComp({tableData, compare, handleSubmit ,dynamicButton}) {

  return <TableContainer component={Paper}>
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
          <TableCell align="right"><b>Action</b></TableCell>
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
                    onChange={(e) => compare({ roleId: e.target.value, _id: row._id })}
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
              <Button onClick={() =>{
                 handleSubmit(row._id)
              }}>{dynamicButton.id == row._id ? <CircularProgress size={25}/>:"Change"}</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>;
}
