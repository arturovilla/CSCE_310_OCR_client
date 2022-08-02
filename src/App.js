import "./App.css";
// import Input from "./components/Input";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Product from "./components/Product";
import Category from "./components/Category";
import Adminsignin from "./pages/Adminsignin";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Navbar from "./components/Navbar";
import Productcards from "./components/Productcards";

//
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/admin-sign-in" element={<Adminsignin />} />

					

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
