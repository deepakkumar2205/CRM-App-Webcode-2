import axios from "axios";
import { useState , useEffect } from "react";
import Context from "./Context";
import API from "../../url";

export default function Provider(props){
    const [theme, setTheme] = useState("light");
    const [badge,setBadge] = useState();
    const [employee, setEmployee] =useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);

    function getEmp(){
      axios({
        url:`${API}/dashboard/getemployees`,
        method:'get',
        headers:{
          'x-Auth-token':localStorage.getItem("x-Auth-token")
        }
       }).then((data)=>{
        setBadge(data.data.length )
        setEmployee(data.data)
        setSortedEmployees(data.data)
       })
    }
    useEffect(() => {
      getEmp()     
    }, [])
    
    return (
      <Context.Provider value={{ theme,
                                 setTheme,
                                 badge,
                                 setBadge,
                                 employee,
                                 setEmployee,
                                 getEmp,
                                 sortedEmployees,
                                 setSortedEmployees
                                 }}>
        {props.children}
      </Context.Provider>
    );
} 