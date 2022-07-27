import "./App.css";
import Input from "./components/Input";
import Product_Input from "./components/Product_Input/Product_Input"
import Category_Input from "./components/Category_Input/Category_Input"
//import NameForm from "./components/Product_Input/NameForm"
import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
	return (
		<Router>
			<Routes>
				<Route path = "/" element={<Input />}/>
				<Route path="/product_input" element={<Product_Input />} />
				<Route path="/category_input" element={<Category_Input />} />
			</Routes>
		</Router>
	);
}

export default App;
