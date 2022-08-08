import React, {useEffect, useState} from "react";
import "../css/Productcard.css";
import { Link } from "react-router-dom";

function Productcards() {
	const [products, setProducts] = useState([])
	//
	const getProducts = async () => {
		try {
			const response = await fetch("http://localhost:3001/ProductDML")
			const data = await response.json()
			setProducts(data)

		} catch (error) {
			console.error(error.message)
		}
	}
	useEffect(() => {
		getProducts()
	}, [])

	return (
		<div>
			{products.map(product => (
				<div className="Productcard__card">
					<Link to="/productpage">
						<div className="Productcard__imgContainer">
							<img
								src= {product.url}
								alt=" the header"
							/>
						</div>
					</Link>

					<div className="Productcard__text">
						<h2>{product.name}</h2>
						<div className="Productcard__brand">
							<h3>{product.description}</h3>
						</div>

						<div className="Productcard__price">
							<h3>€{product.cost}</h3>
						</div>
					</div>
				</div>
			))};
			
		</div>
	);
}

export default Productcards;
