import Adminsignin from "./pages/Adminsignin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Input from "./components/Input";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";


import Navbar from "./components/Navbar";
import Productcards from "./components/Productcards";
import Etorders from "./components/Etorders";
import Etcustomers from "./components/Etcustomers";
import Etproducts from "./components/Etproducts";
import Etsuppliers from "./components/Etsuppliers";
import Product from "./components/Product";
import Courier from "./components/Courier";
import Ordercrud from "./components/Ordercrud";
//
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/admin-sign-in" element={<Adminsignin />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/product" element={<Product />} />
					<Route path="/courier" element={<Courier />} />
					<Route path="/order" element={<Ordercrud />} />
					<Route
						path="/orders-view"
						element={
							<>
								<Admin />
								<Etorders/>
							</>
						}
					/>
					<Route
						path="/customers-view"
						element={
							<>
								<Admin />
								<Etcustomers/>
							</>
						}
					/>
					<Route
						path="/products-view"
						element={
							<>
								<Admin />
								<Etproducts/>
							</>
						}
					/>
					<Route
						path="/suppliers-view"
						element={
							<>
								<Admin />
								<Etsuppliers/>
							</>
						}
					/>
					<Route
						path="/home"
						element={
							<>
								<Home />
								<Navbar />
								<Productcards />
							</>
						}
					/>
					<Route
						path="/menswear"
						element={
							<>
								<Home /> <Navbar />
							</>
						}
					/>
					<Route
						path="/womenswear"
						element={
							<>
								<Home /> <Navbar />
							</>
						}
					/>
					<Route
						path="/tops"
						element={
							<>
								<Home /> <Navbar />
							</>
						}
					/>
					<Route
						path="/bottoms"
						element={
							<>
								<Home /> <Navbar />
							</>
						}
					/>
					<Route
						path="/accessories"
						element={
							<>
								<Home /> <Navbar />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
