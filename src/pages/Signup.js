import React from "react";
import "../css/Signup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
//
function Signup() {
	return (
		<div>
			<div className="Signup__Header">Online Clothing Repository</div>
			<div className="Signup__SubHeader">Enter Your Information</div>
			<div className="Signup__Emailfield">
				<TextField id="outlined-basic" label="Email" variant="outlined" />
			</div>
			<div className="Signup__Passwordfield">
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
				/>
			</div>
			<div className="Signup__LoginButton">
				<Button
					variant="contained"
					disableElevation
					component={Link}
					to="/home"
				>
					Login
				</Button>
			</div>
		</div>
	);
}

export default Signup;
