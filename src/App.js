import "./App.css";
import Input from "./components/Input";
//import Product_Input from "./components/Product_Input/Product_Input"
import NameForm from "./components/Product_Input/NameForm"
import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
	return (
		<Router>
			<Routes>
				<Route path = "/" element={<Input />}/>
				<Route path="/product_input" element={<NameForm />} />
			</Routes>
		</Router>
	);
}

export default App;
