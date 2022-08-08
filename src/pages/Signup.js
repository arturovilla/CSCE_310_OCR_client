import React, {useState} from "react";
import "../css/Signup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
//
function Signup() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [zip_code, setZipCode] = useState('');
    const [payment_type, setPaymentType] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');


	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post(
		  `http://localhost:3001/customer`,
		  {"email": email, 
		"password": password,
		"address": address,
		"name": name,
		"zip_code": zip_code,
		"payment_type": payment_type,
		"phone": phone
		  }
		);
		if (res.data.name === "error") alert("Error when creating Customer"+ ":" + res.data.detail);
		else {
		  alert("A new Customer has been created");
		  navigate('/home');
		}
	
	  };

	return (
		<div>
			<div className="Signup__Header">Online Clothing Repository</div>
			<div className="Signup__SubHeader">Enter Your Information</div>
			<form onSubmit={handleSubmit}>
			<div className="Signup__Namefield">
				<TextField id="outlined-basic" label="Name" variant="outlined"
					value={name}
					onInput={ e=>setName(e.target.value)}
				/>
			</div>
			<div className="Signup__Emailfield">
				<TextField id="outlined-basic" label="Email" variant="outlined"
					value={email}
					onInput={ e=>setEmail(e.target.value)}
				/>
			</div>
			<div className="Signup__Passwordfield">
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
					value={password}
					onInput={ e=>setPassword(e.target.value)}
				/>
			</div>
			<div className="Signup__Zipcode">
				<TextField
					id="outlined-basic"
					label="Zip Code"
					variant="outlined"
					value={zip_code}
					onInput={ e=>setZipCode(e.target.value)}
				/>
			</div>
			<div className="Signup__Address">
				<TextField
					id="outlined-basic"
					label="Address"
					variant="outlined"
					value={address}
					onInput={ e=>setAddress(e.target.value)}
				/>
			</div>
			<div className="Signup__PaymentType">
				<TextField
					id="outlined-basic"
					label="Payment Type"
					variant="outlined"
					value={payment_type}
					onInput={ e=>setPaymentType(e.target.value)}
				/>
			</div>
			<div className="Signup__Phone">
				<TextField
					id="outlined-basic"
					label="Phone"
					variant="outlined"
					value={phone}
					onInput={ e=>setPhone(e.target.value)}
				/>
			</div>
			<div className="Signup__LoginButton">
				<Button
					type="submit"
					variant="contained"
				>
					Create account
				</Button>
			</div>
			</form>
		</div>
	);
}

export default Signup;
