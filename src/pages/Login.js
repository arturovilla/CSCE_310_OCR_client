import React from "react";
import "../css/Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Login() {
	return (
		<div>
			<div className="Login__Header">Online Clothing Repository</div>

			<div className="Login__Emailfield">
				<TextField id="outlined-basic" label="Email" variant="outlined" />
			</div>
			<div className="Login__Passwordfield">
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
				/>
			</div>
			<div className="Login__LoginButton">
				<Button
					variant="contained"
					disableElevation
					component={Link}
					to="/home"
				>
					Login
				</Button>
			</div>
			<div className="Login__SignUp">
				Dont have an account?
				<Button variant="text" disableElevation component={Link} to="/signup">
					Sign Up
				</Button>
			</div>
			<div className="Login__Admin">
				Are you an Admin? Log in
				<Button
					variant="text"
					disableElevation
					component={Link}
					to="/admin-sign-in"
				>
					here
				</Button>
			</div>
		</div>
	);
}

export default Login;
