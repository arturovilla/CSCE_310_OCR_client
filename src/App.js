import "./App.css";
// import Input from "./components/Input";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Product from "./components/Product";
import Category from "./components/Category";
import Adminsignin from "./pages/Adminsignin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/admin-sign-in" element={<Adminsignin />} />
					<Route path="/home" element={<Home />} />
					<Route path="/product" element={<Product />} />
					<Route path="/category" element={<Category />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
