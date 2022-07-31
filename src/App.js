import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";

import "./App.css";

function App() {
  const [Couriers, setCouriers] = useState([]);
  const [newCourier, setNewCourier] = useState({
    coid: "",
    name: "",
    address: "",
    phone: ""
  });
  const [updateCourier, setUpdateCourier] = useState({
    updateId: newCourier.updateId,
    updateName: newCourier.name,
    updateAddress: newCourier.address,
    updatePhone: newCourier.phone
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Courier ID",
        accessor: "coid",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Phone",
        accessor: "phone",
	  },
	  {	
        Header: "Actions",
        accessor: "actions",       
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
  const data = [...Couriers];
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    const getCouriers = async () => {
      const res = await axios.get(
        `http://localhost:3001/CourierDML`
      );
      setCouriers(res.data);
    };
    getCouriers();
  }, []);

  const handleChange = (e) => {
    setNewCourier({
      ...newCourier,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateCourier({
      ...updateCourier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3001/CourierDML`,
      newCourier
    );
    if (res.data.name === "error") alert("Error when creating Courier"+ ":" + res.data.detail);
    else {
      alert("A new Courier has been created");
      const res = await axios.get(
        `http://localhost:3001/CourierDML`
      );
      setCouriers(res.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:3001/CourierDML/` +
        actualUpdatingId,
      {
        coid: updateCourier.updateId,
        name: updateCourier.updateName,
        address: updateCourier.updateAddress,
        phone: updateCourier.updatePhone
      }
    );
    if (res.data.name === "error") alert("Error while updating Courier");
    else {
      alert("Courier has been updated");
      const res = await axios.get(
        `http://localhost:3001/CourierDML`
      );
      setCouriers(res.data);
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
      `http://localhost:3001/CourierDML/` +
        id
    );
	if (res.data.name === "error") alert("Error while deleting Courier");
	else
	{
      alert("Courier has been deleted" );
       const res = await axios.get(
       `http://localhost:3001/CourierDML`
        );
      setCouriers(res.data);
	}
  };

  return (
    <Container fluid="sm" className="p-3">
      <h1>Courier</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Courier name</Form.Label>
          <Form.Control
            name="name"
            value={newCourier.name}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={newCourier.address}
            type="text"			
            onChange={handleChange}
          >
          </Form.Control>

          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            value={newCourier.phone}
            onChange={handleChange}
          >
          </Form.Control>


          <Button type="submit">Add Courier</Button>
        </Form.Group>
      </Form>

      <h2>List of Couriers</h2>
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
          <Modal.Title>Update Courier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Courier Name</Form.Label>
              <Form.Control
                name="updateName"
                value={updateCourier.updateName}
                type="text"
                onChange={handleChangeOnUpdating}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="updateAddress"
                value={updateCourier.updateAddress}
                onChange={handleChangeOnUpdating}
              >
              </Form.Control>

              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="updatePhone"
                value={updateCourier.updatePhone}
                onChange={handleChangeOnUpdating}
              >
              </Form.Control>
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

export default App;