import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
//
import "../css/Adminsignin.css";
//
function Adminsignin() {
	return (
		<div>
			<div className="Adminsignin__Header">Online Clothing Repository</div>
			<div className="Adminsignin__SubHeader">Enter Store</div>

			<div className="Adminsignin__Emailfield">
				<TextField id="outlined-basic" label="Email" variant="outlined" />
			</div>
			<div className="Adminsignin__Passwordfield">
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
				/>
			</div>
			<div className="Adminsignin__LoginButton">
				<Button
					variant="contained"
					disableElevation
					component={Link}
					to="/Admindashboard"
				>
					Login
				</Button>
			</div>
			<div className="Adminsignin__SignUp">
				Dont have an account?
				<Button variant="text" disableElevation component={Link} to="/signup">
					Sign Up
				</Button>
			</div>
			<div className="Adminsignin__Admin">
				Not an Admin? Log in
				<Button variant="text" disableElevation component={Link} to="/signup">
					here
				</Button>
			</div>
		</div>
	);
}

export default Adminsignin;
