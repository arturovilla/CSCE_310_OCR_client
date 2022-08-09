import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";

function Supplier() {
  const [Suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    sid: "",
    name: "",
    address: "",
	zip_code: "",
	country: "",
    phone: "",
	website: ""
  });
  const [updateSupplier, setUpdateSupplier] = useState({
    updateId: newSupplier.updateId,
    updateName: newSupplier.name,
    updateAddress: newSupplier.address,
	updatezip_code: newSupplier.zip_code,
	updateCountry: newSupplier.country,
    updatePhone: newSupplier.phone,
	updateWebsite: newSupplier.website
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Supplier ID",
        accessor: "sid",
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
        Header: "Zip Code",
        accessor: "zip_code",
	  },
      {
        Header: "Country",
        accessor: "country",
	  },
	  {
        Header: "Phone",
        accessor: "phone",
	  },
	  {
        Header: "Website",
        accessor: "website",
	  },
	  {	
        Header: "Actions",
        accessor: "actions",       
		Cell: (row) => (
			<div>
			  <Button
				variant="info"
				size="sm"
				onClick={() => handleOpenModal(row.cell.row.original.sid)}
			  >
				Update
			  </Button>{" "}
			  <Button
				variant="danger"
				size="sm"
				onClick={() => handleDelete(row.cell.row.original.sid)}
			  >
				Delete
			  </Button>
			</div>	
        ),				
      },	
    ],
    []
  );
  const data = [...Suppliers];
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    const getSuppliers = async () => {
      const res = await axios.get(
        `http://localhost:3001/SupplierDML`
      );
      setSuppliers(res.data);
    };
    getSuppliers();
  }, []);

  const handleChange = (e) => {
    setNewSupplier({
      ...newSupplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateSupplier({
      ...updateSupplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3001/SupplierDML`,
      newSupplier
    );
    if (res.data.name === "error") alert("Error when creating Supplier"+ ":" + res.data.detail);
    else {
      alert("A new Supplier has been created");
      const res = await axios.get(
        `http://localhost:3001/SupplierDML`
      );
      setSuppliers(res.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:3001/SupplierDML/` +
        actualUpdatingId,
      {
        sid: updateSupplier.updateId,
        name: updateSupplier.updateName,
        address: updateSupplier.updateAddress,
		zip_code: updateSupplier.updatezip_code,
		country: updateSupplier.updateCountry,
        phone: updateSupplier.updatePhone,
		website: updateSupplier.updateWebsite
      }
    );
    if (res.data.name === "error") alert("Error while updating Supplier");
    else {
      alert("Supplier has been updated");
      const res = await axios.get(
        `http://localhost:3001/SupplierDML`
      );
      setSuppliers(res.data);
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
    const res = await axios.delete(
      `http://localhost:3001/SupplierDML/` +
        id
    );
	if (res.data.name === "error") alert("Error while deleting Supplier");
	else
	{
      alert("Supplier has been deleted" );
       const res = await axios.get(
       `http://localhost:3001/SupplierDML`
        );
      setSuppliers(res.data);
	}
  };

  return (
    <Container fluid="sm" className="p-3">
      <h1>Supplier</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control
            name="name"
            value={newSupplier.name}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={newSupplier.address}
            type="text"			
            onChange={handleChange}
          >
        </Form.Control>

		<Form.Label>Zip Code</Form.Label>
          <Form.Control
            name="zip_code"
            value={newSupplier.zip_code}
            onChange={handleChange}
          >
        </Form.Control>

		<Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            value={newSupplier.country}
            onChange={handleChange}
          >
        </Form.Control>

        <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            value={newSupplier.phone}
            onChange={handleChange}
          >
        </Form.Control>

		<Form.Label>Website</Form.Label>
          <Form.Control
            name="website"
            value={newSupplier.website}
            onChange={handleChange}
          >
        </Form.Control>


          <Button type="submit">Add Supplier</Button>
        </Form.Group>
      </Form>

      <h2>List of Suppliers</h2>
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
          <Modal.Title>Update Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                name="updateName"
                value={updateSupplier.updateName}
                type="text"
                onChange={handleChangeOnUpdating}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="updateAddress"
                value={updateSupplier.updateAddress}
                onChange={handleChangeOnUpdating}
              >
            </Form.Control>

			<Form.Label>Zip Code</Form.Label>
              <Form.Control
                name="updatezip_code"
                value={updateSupplier.updatezip_code}
                onChange={handleChangeOnUpdating}
              >
            </Form.Control>

			<Form.Label>Country</Form.Label>
              <Form.Control
                name="updateCountry"
                value={updateSupplier.updateCountry}
                onChange={handleChangeOnUpdating}
              >
            </Form.Control>

            <Form.Label>Phone</Form.Label>
              <Form.Control
                name="updatePhone"
                value={updateSupplier.updatePhone}
                onChange={handleChangeOnUpdating}
              >
            </Form.Control>

			<Form.Label>Website</Form.Label>
              <Form.Control
                name="updateWebsite"
                value={updateSupplier.updateWebsite}
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

export default Supplier;