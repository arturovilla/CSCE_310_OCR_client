import React from 'react'
import { Link } from "react-router-dom";

import "../css/Admin.css";
function Admin() {
    return (
		<div>
			<div className="Admin__Header">Online Clothing Repository</div>
            <div className='Adminbar__list'>
                <div className="Adminbar__Nav">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/orders-view">Orders</Link>
                        </li>
                        <li>
                            <Link to="/customers-view">Customers</Link>
                        </li>
                        <li>
                            <Link to="/products-view">Products</Link>
                        </li>
                        <li>
                            <Link to="/suppliers-view">Suppliers</Link>
                        </li>
                    </ul>
                </div>
            </div>
		</div>
	);
};


export default Admin;
