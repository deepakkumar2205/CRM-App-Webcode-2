import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../../../url';
import styles from "./Login.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "dk44861@gmail.com", password: "ironman2205" });
	const [error, setError] = useState(false);
	const [state, setState] = useState("Login")
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
 
	const handleSubmit = async (e) => {
		e.preventDefault();
		setState("Loading...")
		fetch(`${API}/users/login`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
			  "Content-Type": "application/json",
			},
		  })
		  .then((response)=>{
			if(response.status === 401){
				toast("invalid Creadentials")
				throw new Error(response.statusText)
			}else if(response.status === 405){
				setError(true);
				setTimeout(() => {
					setError(false)
				}, 5000);
			}else{
				setState("success")
				return response.json();
			}
		  })
		  .then((data) => {
			localStorage.setItem("x-Auth-token", data.token);
			localStorage.setItem("roleId", data.roleId);
			localStorage.setItem("_id", data._id);
			toast("successfully logged in")
		    navigate("/dashboard")
		  })
		  .catch((err)=>{
			setState("Error")
			console.log(err);
		  })
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1 style={{color:"black"}}>Login to Your Account</h1>
						<input
							type="email"
							placeholder="email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error &&<div className={styles.error_msg}>Verification link is sended to your mail. Click that before Login</div>}
						<Link to='/resetPassword'>Forget password?</Link>
						<button type="submit" className={styles.green_btn}>
							{state}
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;



