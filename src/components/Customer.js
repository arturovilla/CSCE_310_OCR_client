import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";




function Customer() {
    //get all orders
	const [Customers, setCustomers] = useState([]);
    // 
    // create
	const [newCustomer, setNewCustomer] = useState({
		name: "",
		phone: "",
		password: "",
		zip_code: "",
		address: "",
		payment_type: "",
        payment_info: "",
        email: "",
        admin: "",
        cid: ""
	  });
    //   
    // update
    const [updateCustomer, setUpdateCustomer] = useState({
        updateName: newCustomer.updateName,
        updatePhone: newCustomer.updatePhone,
        updatePassword: newCustomer.updatePassword,
        updateZipcode: newCustomer.updateZipcode,
        updateAddress: newCustomer.updateAddress,
        updatePaymentType: newCustomer.updatePaymentType,
        updatePaymentInfo: newCustomer.updatePaymentInfo,
        updateEmail: newCustomer.updateEmail,
        updateAdmin: newCustomer.updateAdmin,
        updateCid: newCustomer.updateCid
    });
    //   

    const [showModal, setShowModal] = useState(false);
    const [actualUpdatingId, setActualUpdatingId] = useState();
    const columns = React.useMemo(
		() => [
		  {
			Header: "Name",
			accessor: "name",
		  },
		  {
			Header: "Phone",
			accessor: "phone",
		  },
		  {
			Header: "Password",
			accessor: "password",
		  },
		  {
			Header: "Zip Code",
			accessor: "zip_code",
		  },
		  {
			Header: "Address",
			accessor: "address",
		  },
          {
			Header: "Payment Type",
			accessor: "payment_type",
		  },
          {
			Header: "Payment Info",
			accessor: "payment_info",
		  },
          {
			Header: "Email",
			accessor: "email",
		  },
          {
			Header: "Admin",
			accessor: "admin",
		  },
		  {	
			Header: "Customer ID",
			accessor: "cid",       
			Cell: (row) => (
				<div>
				  <Button
					variant="info"
					size="sm"
					onClick={() => handleOpenModal(row.cell.row.original.cid)}
				  >
					Update
				  </Button>{" "}
				  <Button
					variant="danger"
					size="sm"
					onClick={() => handleDelete(row.cell.row.original.cid)}
				  >
					Delete
				  </Button>
				</div>	
			),				
		  },	
		],
		[]
	  );
      //
	  const data = [...Customers];
	  const tableInstance = useTable({ columns, data });
	  const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = tableInstance;

	  useEffect(() => {
		const getCustomers = async () => {
		  const res = await axios.get(
			`http://localhost:3001/customer`
		  );
		  setCustomers(res.data);
		};
		getCustomers();
	  }, []);

	  const handleChange = (e) => {
		setNewCustomer({
		  ...newCustomer,
		  [e.target.name]: e.target.value,
		});
	  };

	  const handleChangeOnUpdating = (e) => {
		setUpdateCustomer({
		  ...updateCustomer,
		  [e.target.name]: e.target.value,
		});
	  };

	  const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post(
		  `http://localhost:3001/customer`,
		  newCustomer
		);
		if (res.data.name === "error") alert("Error when creating Customer"+ ":" + res.data.detail);
		else {
		  alert("A new Customer has been created");
		  const res = await axios.get(
			`http://localhost:3001/customer`
		  );
		  setCustomers(res.data);
		}
	  };

	  const handleUpdate = async (e) => {
		e.preventDefault();
		const res = await axios.put(
		  `http://localhost:3001/customer/` +
			actualUpdatingId,
		  {
			name: updateCustomer.updateName,
			phone: updateCustomer.updatePhone,
			password: updateCustomer.updatePassword,
			zip_code: updateCustomer.updateZipcode,
			address: updateCustomer.updateAddress,
			payment_type: updateCustomer.updatePaymentType,
            payment_info: updateCustomer.updatePaymentInfo,
            email: updateCustomer.updateEmail,
            admin: updateCustomer.updateAdmin,
            cid: updateCustomer.updateCid
		  }
		);
		if (res.data.name === "error") alert("Error while updating Customer");
		else {
		  alert("Customer has been updated");
		  const res = await axios.get(
			`http://localhost:3001/customer`
		  );
		  setCustomers(res.data);
		  handleCloseModal();
		}
	  };
      //
	  const handleOpenModal = (id) => {
		setShowModal(true);
		setActualUpdatingId(id);
	  };

	  const handleCloseModal = () => {
		setShowModal(false);
	  };
      //
	  const handleDelete = async (id) => {
		console.log(id);
		const res = await axios.delete(
		  `http://localhost:3001/customer/` +
			id
		);
		if (res.data.name === "error") alert("Error while deleting Customer");
		else
		{
		  alert("Customer has been deleted" );
		   const res = await axios.get(
		   `http://localhost:3001/customer`
			);
		  setCustomers(res.data);
		}
	};
    //   MARK UP
    //   STARTS HERE
	return (
		<Container fluid="sm" className="p-3">
		  <h1>Customers</h1>
	
		  <Form onSubmit={handleSubmit}>
            
			<Form.Group controlId="">
			  <Form.Label>Name</Form.Label>
			  <Form.Control
				name="name"
				value={newCustomer.name}
				type="text"
				onChange={handleChange}
			  />
			</Form.Group>
	
			<Form.Group controlId="">
			  <Form.Label>Phone</Form.Label>
                <Form.Control
                    name="phone"
                    value={newCustomer.phone}
                    type="text"			
                    onChange={handleChange}
                >
			  </Form.Control>
	
			  <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    value={newCustomer.password}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

			  <Form.Label>Zipcode</Form.Label>
                <Form.Control
                    name="zip_code"
                    value={newCustomer.zip_code}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

			  <Form.Label>Address</Form.Label>
                <Form.Control
                    name="address"
                    value={newCustomer.address}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

			  <Form.Label>Payment Type</Form.Label>
                <Form.Control
                    name="payment_type"
                    value={newCustomer.payment_type}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

              <Form.Label>Payment Info</Form.Label>
                <Form.Control
                    name="payment_info"
                    value={newCustomer.payment_info}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

              <Form.Label>Email</Form.Label>
                <Form.Control
                    name="email"
                    value={newCustomer.email}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

              <Form.Label>IsAdmin</Form.Label>
                <Form.Control
                    name="admin"
                    value={newCustomer.admin}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>

              <Form.Label>CID</Form.Label>
                <Form.Control
                    name="cid"
                    value={newCustomer.cid}
                    type="text"
                    onChange={handleChange}
                >
			  </Form.Control>
	
	
			  <Button type="submit">Add Order</Button>
			</Form.Group>
		  </Form>
	
		  <h2>List of Orders</h2>
		  <Table responsive="lg" striped bordered hover {...getTableProps()}>
			<thead>
			  {headerGroups.map((headerGroup) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
				  {headerGroup.headers.map((column) => (
					<th {...column.getHeaderProps()}>{column.render("Header")}</th>
				  ))}
				</tr>
			  ))}
			</thead>
			<tbody {...getTableBodyProps()}>
			  {rows.map((row, i) => {
				prepareRow(row);
				return (
				  <tr {...row.getRowProps()}>
					{row.cells.map((cell) => {
					  return (
						<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
					  );
					})}
				  </tr>
				);
			  })}
			</tbody>
		  </Table>
	
		  <Modal show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
			  <Modal.Title>Update Customer</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			  <Form onSubmit={handleUpdate}>
				<Form.Group>
				  <Form.Label>Name</Form.Label>
				  <Form.Control
					name="updateName"
					value={updateCustomer.updateName}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Phone</Form.Label>
				  <Form.Control
					name="updatePhone"
					value={updateCustomer.updatePhone}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Password</Form.Label>
				  <Form.Control
					name="updatePassword"
					value={updateCustomer.updatePassword}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Zipcode</Form.Label>
				  <Form.Control
					name="updateZipcode"
					value={updateCustomer.updateZipcode}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Address</Form.Label>
				  <Form.Control
					name="updateAddress"
					value={updateCustomer.updateAddress}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Payment Type</Form.Label>
				  <Form.Control
					name="updatePaymentType"
					value={updateCustomer.updatePaymentType}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

                <Form.Group>
				  <Form.Label>Payment Info</Form.Label>
				  <Form.Control
					name="updatePaymentInfo"
					value={updateCustomer.updatePaymentInfo}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

                <Form.Group>
				  <Form.Label>Email</Form.Label>
				  <Form.Control
					name="updateEmail"
					value={updateCustomer.updateEmail}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

                <Form.Group>
				  <Form.Label>IsAdmin</Form.Label>
				  <Form.Control
					name="updateAdmin"
					value={updateCustomer.updateAdmin}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>
	
			  </Form>
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={handleCloseModal}>
				Close
			  </Button>
			  <Button type="submit" onClick={handleUpdate} variant="primary">
				Save Changes
			  </Button>
			</Modal.Footer>
		  </Modal>
		</Container>
	  );
}

export default Customer;