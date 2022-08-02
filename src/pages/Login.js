import React, {useState} from "react";
import "../css/Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate} from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	function handleSubmit(event) {
        event.preventDefault();
		fetch('http://localhost:3001/check_login', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({"email": email, "password": password})
        })
        .then((response) => {
			var json_result = response.json();
			json_result.then(function(result) {
				if (result["valid_login"]){
					alert("logged in correctly!");
					navigate('/home');
				}
				else{
					alert("please try to login again")
					setEmail("");
					setPassword("");
				}
			})
        });
		
       // You should see email and password in console.
       // ..code to submit form to backend here...

    }
	return (
		<div>

		<div className="Login__Header">Online Clothing Repository</div>
		<form onSubmit={handleSubmit}>
			<div className="Login__Emailfield">
			<TextField id="outlined-basic" label="Email" variant="outlined"
			value={email}
			onInput={ e=>setEmail(e.target.value)}
			/>
			</div>
		<div className="Login__Passwordfield">
		<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
					value={password}
					onInput={ e=>setPassword(e.target.value)}
				/>
		</div>
		<div className="Login__LoginButton">
		<Button
					type="submit"
					variant="contained"
				>
				Login
		</Button>
		</div>
	</form>
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
