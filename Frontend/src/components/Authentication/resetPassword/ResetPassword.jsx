import React from 'react';
import { useState } from 'react';
import './ResetPassword.css';
import API from  '../../../url';
import { toast } from 'react-toastify';

const ResetPassword = () => {
	const [info,setInfo] =useState("Reset");
	const [state, setState]= useState("");

const handleSubmit=(e) =>{
		e.preventDefault()
        setInfo("Loading...")
		fetch(`${API}/users/resetpassword`, {
			method: "POST",
			body: JSON.stringify({'email':state}),
			headers: {
			  "Content-Type": "application/json",
			},
		  })
		  .then((response)=>{
			if(response.status ===200){
				toast("check your mail and reset your password")
			}else if(response.status === 401){
				toast("invalid credentials")
			}
			return response.json()
		  }).then ((data)=>{
			setInfo("successful")
			console.log(data);
		  }).catch((err)=>{
			setInfo("error")
			console.log(err);
		  })

	}
  return (
    <div className='login_container'>
			<div className='login_form_container'>
				<div className='left'>
					<form className='form_container'>
						<h1 style={{color:"black"}}>Enter your email to rest your password</h1>
						<input
							type="email"
							placeholder="Password"
							name="password"
							className='input'
							value={state}
							onChange={(e)=>setState(e.target.value)}
						/>
						<button type="submit" className='green_btn'onClick={handleSubmit}>
							{info}
						</button>
					</form>
				</div>			
			</div>
		</div>
    )
}

export default ResetPassword ;