import { CircularProgress } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import API from '../../url';
import {toast} from 'react-toastify';
import { AllocationTableComp } from './AllocationTableComp';
import Context from '../ContextFold/Context';

export  function Allocation() {
  const [tableData,setTableData ] = React.useState([]);
  const [render, setRender]= React.useState(true);
  const [ dynamicButton, setDynamicButton ] = React.useState({id:0});
  const context =React.useContext(Context)
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
  setDynamicButton({id:id})
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
        setDynamicButton({id:0})
      }else{
        toast("Role is updated successfully")
        setRender(render ? false: true)
        context.getEmp()
        setDynamicButton({id:0})
      }
    })
      .catch((err)=>console.log(err))
  }else{
   toast("select data first")
   setDynamicButton({id:0})
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
    <div>
      {tableData.length === 0 ? (
        <CircularProgress size={100} />
      ) : (
        <AllocationTableComp
          tableData={tableData}
          compare={compare}
          handleSubmit={handleSubmit}
          dynamicButton={dynamicButton}
        />
      )}
    </div>
  );
}


