import React, { useState } from "react";

function Input() {
	//
	const [description, setDescription] = useState("");
	//
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch("http://localhost:3001/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			console.log(response);
		} catch (err) {
			console.error(err.message);
		}
	};
	//
	return (
		<div>
			<h1>Input</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button>Add</button>
			</form>
		</div>
	);
}

export default Input;
