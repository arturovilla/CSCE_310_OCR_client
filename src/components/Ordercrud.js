import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";




function Ordercrud() {
	const [Orders, setOrders] = useState([]);
	const [newOrder, setNewOrder] = useState({
		orderid: "",
		deliveryStatus: "",
		orderDate: "",
		quantity: "",
		coid: "",
		cid: ""
	  });
	  const [updateOrder, setUpdateOrder] = useState({
		updateOrderId: newOrder.updateOrderId,
		updateDeliveryStatus: newOrder.updateDeliveryStatus,
		updateOrderDate: newOrder.updateOrderDate,
		updateQuantity: newOrder.updateQuantity,
		updateCoid: newOrder.updateCoid,
		updateCid: newOrder.updateCid
	  });
	  const [showModal, setShowModal] = useState(false);
 	  const [actualUpdatingId, setActualUpdatingId] = useState();
	   const columns = React.useMemo(
		() => [
		  {
			Header: "Order ID",
			accessor: "orderid",
		  },
		  {
			Header: "Delivery Status",
			accessor: "deliveryStatus",
		  },
		  {
			Header: "Order Date",
			accessor: "orderDate",
		  },
		  {
			Header: "Quantity",
			accessor: "quantity",
		  },
		  {
			Header: "Courier ID",
			accessor: "coid",
		  },
		  {	
			Header: "Customer ID",
			accessor: "cid",       
			Cell: (row) => (
				<div>
				  <Button
					variant="info"
					size="sm"
					onClick={() => handleOpenModal(row.cell.row.original.coid)}
				  >
					Update
				  </Button>{" "}
				  <Button
					variant="danger"
					size="sm"
					onClick={() => handleDelete(row.cell.row.original.coid)}
				  >
					Delete
				  </Button>
				</div>	
			),				
		  },	
		],
		[]
	  );
	  const data = [...Orders];
	  const tableInstance = useTable({ columns, data });
	  const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = tableInstance;

	  useEffect(() => {
		const getOrders = async () => {
		  const res = await axios.get(
			`http://localhost:3001/OrderDML`
		  );
		  setOrders(res.data);
		};
		getOrders();
	  }, []);

	  const handleChange = (e) => {
		setNewOrder({
		  ...newOrder,
		  [e.target.name]: e.target.value,
		});
	  };

	  const handleChangeOnUpdating = (e) => {
		setUpdateOrder({
		  ...updateOrder,
		  [e.target.name]: e.target.value,
		});
	  };

	  const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post(
		  `http://localhost:3001/OrderDML`,
		  newOrder
		);
		if (res.data.name === "error") alert("Error when creating Order"+ ":" + res.data.detail);
		else {
		  alert("A new Order has been created");
		  const res = await axios.get(
			`http://localhost:3001/OrderDML`
		  );
		  setOrders(res.data);
		}
	  };

	  const handleUpdate = async (e) => {
		e.preventDefault();
		const res = await axios.put(
		  `http://localhost:3001/OrderDML/` +
			actualUpdatingId,
		  {
			orderid: updateOrder.updateOrderId,
			deliveryStatus: updateOrder.updateDeliveryStatus,
			orderDate: updateOrder.updateOrderDate,
			quantity: updateOrder.updateQuantity,
			coid: updateOrder.updateCoid,
			cid: updateOrder.updateCid
		  }
		);
		if (res.data.name === "error") alert("Error while updating Order");
		else {
		  alert("Order has been updated");
		  const res = await axios.get(
			`http://localhost:3001/OrderDML`
		  );
		  setOrders(res.data);
		  handleCloseModal();
		}
	  };

	  const handleOpenModal = (id) => {
		setShowModal(true);
		setActualUpdatingId(id);
	  };

	  const handleCloseModal = () => {
		setShowModal(false);
	  };

	  const handleDelete = async (id) => {
		console.log(id);
		const res = await axios.delete(
		  `http://localhost:3001/OrderDML/` +
			id
		);
		if (res.data.name === "error") alert("Error while deleting Order");
		else
		{
		  alert("Order has been deleted" );
		   const res = await axios.get(
		   `http://localhost:3001/OrderDML`
			);
		  setOrders(res.data);
		}
	  };

	  return (
		<Container fluid="sm" className="p-3">
		  <h1>Order</h1>
	
		  <Form onSubmit={handleSubmit}>
			<Form.Group controlId="">
			  <Form.Label>Order ID</Form.Label>
			  <Form.Control
				name="orderid"
				value={newOrder.orderid}
				type="text"
				onChange={handleChange}
			  />
			</Form.Group>
	
			<Form.Group controlId="">
			  <Form.Label>Delivery Status</Form.Label>
			  <Form.Control
				name="deliveryStatus"
				value={newOrder.deliveryStatus}
				type="text"			
				onChange={handleChange}
			  >
			  </Form.Control>
	
			  <Form.Label>Order Date</Form.Label>
			  <Form.Control
				name="orderDate"
				value={newOrder.orderDate}
				type="text"
				onChange={handleChange}
			  >
			  </Form.Control>

			  <Form.Label>Quantity</Form.Label>
			  <Form.Control
				name="quantity"
				value={newOrder.quantity}
				type="text"
				onChange={handleChange}
			  >
			  </Form.Control>

			  <Form.Label>Courier ID</Form.Label>
			  <Form.Control
				name="coid"
				value={newOrder.coid}
				type="text"
				onChange={handleChange}
			  >
			  </Form.Control>

			  <Form.Label>Customer ID</Form.Label>
			  <Form.Control
				name="cid"
				value={newOrder.cid}
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
			  <Modal.Title>Update Order</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			  <Form onSubmit={handleUpdate}>
				<Form.Group>
				  <Form.Label>Order ID</Form.Label>
				  <Form.Control
					name="updateOrderId"
					value={updateOrder.updateOrderId}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Deliver Status</Form.Label>
				  <Form.Control
					name="updateDeliveryStatus"
					value={updateOrder.updateDeliveryStatus}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Order Date</Form.Label>
				  <Form.Control
					name="updateOrderDate"
					value={updateOrder.updateOrderDate}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Quantity</Form.Label>
				  <Form.Control
					name="updateQuantity"
					value={updateOrder.updateQuantity}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Courier ID</Form.Label>
				  <Form.Control
					name="updateCoid"
					value={updateOrder.updateCoid}
					type="text"
					onChange={handleChangeOnUpdating}
				  />
				</Form.Group>

				<Form.Group>
				  <Form.Label>Customer ID</Form.Label>
				  <Form.Control
					name="updateCid"
					value={updateOrder.updateCid}
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

export default Ordercrud;