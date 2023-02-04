import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ResetPassPage.css'
import API from '../../../url'
import { toast } from 'react-toastify'

const ResetPassPage = () => {
    const [state, setState ] = useState("Loading");
    const [errorMsg,setErrorMsg] = useState(false);
    const [button,setButton] =useState("Submit")
    const { string } = useParams();
    const [flag ,setFlag]=useState(true);
    const [data, setData] = useState({ password: "", confirmPassword: "" });
    const [mailid,setMailid] = useState("");
    const navigate =useNavigate();

    if(flag){
        setFlag(false);
    fetch(`${API}/users/resetpassword/${string}`)
      .then((response) => {
        if (response.status === 200) {
          setState("success")
        } else if (response.status === 404) {
          setState("invalid")
        }
        return response.json()
      })
      .then((data) =>{
        if(data.message ==='present'){
            setMailid(data.email)
        }
      })
      .catch((err) => console.log(err));
    }

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(data.password === data.confirmPassword){
            setButton("Loading...")
            const info={
                email:mailid,
                password:data.password
            }
            console.log(info);
        fetch(`${API}/users/changePassword/${string}`, {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) =>{
            if(data.message ==='successfull' ){
                setButton("success")
                toast("password changed successfully")
                navigate("/")
            }else if(data.message ==='Invalid'){
                toast("something went wrong")
            }
            console.log(data.message);
          })
          .catch((err) => console.log(err));
        }else{
            setErrorMsg(true);
            setTimeout(() => {
                setErrorMsg(false);
            }, 3000);
        }
    }

  return (
    <div>
    {state ==="Loading"?<h1>Loading...</h1>:state ==='success'?<div className='login_container'>
			<div className='login_form_container' onSubmit={handleSubmit}>
				<div className='left'>
					<form className='form_container'>
						<h1 style={{color:"black"}}>Password Reset Form</h1>
						<input
							type="text"
							placeholder="Password"
							name="password"
							className='input'
                            required
                            onChange={handleChange}
                            value={data.password}
                            minLength='8'
						/>
						<input
							type="text"
							placeholder="Confirm Password"
							name="confirmPassword"
							className='input'
                            required
                            onChange={handleChange}
                            value={data.confirmPassword}
                            minLength='8'
						/>
                        {errorMsg?<div className='error_msg'>Password not match</div>:<></>}
                    <button type="submit" className='green_btn'>{button}</button>
					</form>
				</div>			
			</div>
		</div>:<h1>Invalid</h1>}
        </div>
  )
}


export default ResetPassPage ;