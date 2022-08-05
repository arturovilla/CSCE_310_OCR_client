import React from "react";
import "../css/Productcard.css";
import { Link } from "react-router-dom";

function Productcards() {
	return (
		<div>
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
					<h2>DIGITAL PRINT SATIN DRESS</h2>
					<div className="Productcard__brand">
						<h3>adidas</h3>
					</div>

					<div className="Productcard__price">
						<h3>€530</h3>
					</div>
				</div>
			</div>
			<div className="Productcard__card">
				<Link to="/productpage">
					<div className="Productcard__imgContainer">
						<img
							src="https://www.acnestudios.com/on/demandware.static/-/Sites-acne-product-catalog/default/dwc87b5e10/images/BB/BB0431-/1500x/BB0431-AFB_A.jpg"
							alt=" the header"
						/>
					</div>
				</Link>

				<div className="Productcard__text">
					<h2>ORGANIC DENIM SHIRT</h2>
					<div className="Productcard__brand">
						<h3>Nike</h3>
					</div>

					<div className="Productcard__price">
						<h3>€320</h3>
					</div>
				</div>
			</div>
			<div className="Productcard__card">
				<Link to="/productpage">
					<div className="Productcard__imgContainer">
						<img
							src="https://www.acnestudios.com/on/demandware.static/-/Sites-acne-product-catalog/default/dw2060f623/images/CB/CB0038-/1500x/CB0038-CWP_A.jpg"
							alt=" the header"
						/>
					</div>
				</Link>

				<div className="Productcard__text">
					<h2>SHORT SLEEVE SHIRT</h2>
					<div className="Productcard__brand">
						<h3>Rick Owens</h3>
					</div>

					<div className="Productcard__price">
						<h3>€290</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Productcards;
