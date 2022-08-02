import React from "react";
import "../css/Productcard.css";
import { Link } from "react-router-dom";

function Productcards() {
	return (
		<div className="Productcard__card">
			<Link to="/productpage">
				<div className="Productcard__imgContainer">
					<img
						src="https://www.acnestudios.com/on/demandware.static/-/Sites-acne-product-catalog/default/dw622a6b52/images/A2/A20445-/1500x/A20445-AMV_A.jpg"
						alt=" the header"
					/>
				</div>
			</Link>

			<div className="Productcard__text">
				<h2>TITLE GOES HERE</h2>
				<div className="Productcard__brand">
					<h3>Product name/ designer</h3>
				</div>

				<div className="Productcard__price">
					<h3>Price goes here</h3>
				</div>
			</div>
		</div>
	);
}

export default Productcards;
