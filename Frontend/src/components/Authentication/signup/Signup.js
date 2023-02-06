import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupcss from"./Signup.module.css";
import API from '../../../url.js';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "deepak",
		lastName: "kumar",
		email: "dk44861@gmail.com",
		emailVerified:"no",
		password: "ironman2205",
		roleId:"0"
	});
	const [state, setState] = useState("Signup");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		setState("Loading...")
		e.preventDefault();
		fetch(`${API}/users/signup`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
			  "Content-Type": "application/json",
			},
		  })
		  .then((response)=>{
			if(response.status === 401){
				throw new Error(response.statusText)
			}else{
				setState("success")
				return response.json();
			}
		  })
		  .then((data) => {
			if(data.message ==='already exist'){
				toast('already exist')
			}else if(data.message === 'password must be at least 8 characters'){
				toast('password must be 8 characters exist')
			}else{
				toast("Check your email and click the link to verify your E-Mail address")
				// localStorage.setItem("x-Auth-token", data.token);
				// localStorage.setItem("roleId", data.roleId);
				// getAllMobilesFn();
				navigate('/')
			}
		  })
		  .catch((err)=>{
			console.log(err);
			setState("Error")
		  })
	

	};

	return (
		<div className={signupcss.signup_container}>
			<div className={signupcss.signup_form_container}>
				<div className={signupcss.left}>
					<h1>Welcome Back</h1>
					<Link to="/"> 
						<button type="button" className={signupcss.white_btn}>
							Log in
						</button>
					</Link>
				</div>
				<div className={signupcss.right}>
					<form className={signupcss.form_container} onSubmit={handleSubmit}>
						<h1 style={{color:"black"}}>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={signupcss.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={signupcss.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={signupcss.input}
						/>
						<input
							type="text"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							minLength='8'
							required
							className={signupcss.input}
						/>
						{/* {error && <div className={signupcss.error_msg}>{error}</div>} */}
						<button type="submit" className={signupcss.green_btn}>
							{state}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;