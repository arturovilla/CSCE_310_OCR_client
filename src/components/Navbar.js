import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

//
function Navbar() {
	return (
		<div className="Navbar__list">
			<div className="Navbar__Nav">
				<ul style={{ listStyleType: "none", padding: 0 }}>
					<li>
						<Link to="/menswear">Menswear</Link>
					</li>
					<li>
						<Link to="/womenswear">Womenswear</Link>
					</li>
					<li>
						<Link to="/tops">Tops</Link>
					</li>
					<li>
						<Link to="/bottoms">Bottoms</Link>
					</li>
					<li>
						<Link to="/accessories">Accessories</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
