import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";

import "./../App.css";

function Product() {
  const [Products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    pid: '',
    name: '',
    description: '',
    color: '',
    catid: '',
    sid: '',
    cost: '',
    size: '',
    quantity: '',
    url: ''
  });
  const [updateProduct, setUpdateProduct] = useState({
    updatepid: newProduct.updatepid,
    updatename: newProduct.name,
    updatedescription: newProduct.description,
    updatecolor: newProduct.color,
    updatecatid: newProduct.catid,
    updatesid: newProduct.sid,
    updatecost: newProduct.cost,
    updatesize: newProduct.size,
    updatequantity: newProduct.quantity,
    updateurl: newProduct.url

  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();
  const columns = React.useMemo(
    () => [
    {
        Header: "PID",
        accessor: "pid",
        },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Color",
        accessor: "color",
	  },
      {
        Header: "Category",
        accessor: "catid",
	  },
      {
        Header: "Supplier",
        accessor: "sid",
	  },
      {
        Header: "Cost",
        accessor: "cost",
	  },
      {
        Header: "Size",
        accessor: "size",
	  },
      {
        Header: "Quantity",
        accessor: "quantity",
	  },
      {
        Header: "URL",
        accessor: "url",
	  },
	  {	
        Header: "Actions",
        accessor: "actions",       
		Cell: (row) => (
			<div>
			  <Button
				variant="info"
				size="sm"
				onClick={() => handleOpenModal(row.cell.row.original.pid)}
			  >
				Update
			  </Button>{" "}
			  <Button
				variant="danger"
				size="sm"
				onClick={() => handleDelete(row.cell.row.original.pid)}
			  >
				Delete
			  </Button>
			</div>	
        ),				
      },	
    ],
    []
  );
  const data = [...Products];
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `http://localhost:3001/ProductDML`
      );
      setProducts(res.data);
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateProduct({
      ...updateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3001/ProductDML`,
      newProduct
    );
    if (res.data.name === "error") alert("Error when creating Product"+ ":" + res.data.detail);
    else {
      alert("A newProduct has been created");
      const res = await axios.get(
        `http://localhost:3001/ProductDML`
      );
      setProducts(res.data);
      setNewProduct({pid: '',
      name: '',
      description: '',
      color: '',
      catid: '',
      sid: '',
      cost: '',
      size: '',
      quantity: '',
      url: ''});
    }

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:3001/ProductDML/` +
        actualUpdatingId,
      {

        pid: updateProduct.updatepid,
        name: updateProduct.updatename,
        description: updateProduct.updatedescription,
        color: updateProduct.updatecolor,
        catid: updateProduct.updatecatid,
        sid: updateProduct.updatesid,
        cost: updateProduct.updatecost,
        size: updateProduct.updatesize,
        quantity: updateProduct.updatequantity,
        url: updateProduct.updateurl

      }
    );
    if (res.data.name === "error") alert("Error while updating Product");
    else {
      alert("Proudct has been updated");
      const res = await axios.get(
        `http://localhost:3001/ProductDML`
      );
      setProducts(res.data);
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
      `http://localhost:3001/ProductDML/` +
        id
    );
	if (res.data.name === "error") alert("Error while deleting Product");
	else
	{
      alert("Product has been deleted" );
       const res = await axios.get(
       `http://localhost:3001/ProductDML`
        );
      setProducts(res.data);
	}
  };

  return (
    <Container fluid="sm" className="p-3">
      <h1>Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            name="name"
            value={newProduct.name}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="description"
            value={newProduct.description}
            type="text"
            onChange={handleChange}
          />
    
          <Form.Label>Product Cost</Form.Label>
          <Form.Control
            name="cost"
            value={newProduct.cost}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product Color</Form.Label>
          <Form.Control
            name="color"
            value={newProduct.color}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product Category</Form.Label>
          <Form.Control
            name="catid"
            value={newProduct.catid}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product Supplier</Form.Label>
          <Form.Control
            name="sid"
            value={newProduct.sid}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            name="quantity"
            value={newProduct.quantity}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product URL</Form.Label>
          <Form.Control
            name="url"
            value={newProduct.url}
            type="text"
            onChange={handleChange}
          />

          <Form.Label>Product Size</Form.Label>
          <Form.Control
            name="size"
            value={newProduct.size}
            type="text"
            onChange={handleChange}
          />

          <Button type="submit">Add Product</Button>
        </Form.Group>
      </Form>

      <h2>List of Products</h2>
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
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
        <Form.Group controlId="">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            name="updatename"
            value={updateProduct.updatename}
            type="text"
            onChange={handleChangeOnUpdating}
          />

          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="updatedescription"
            value={updateProduct.updatedescription}
            type="text"
            onChange={handleChangeOnUpdating}
          />
    
          <Form.Label>Product Cost</Form.Label>
          <Form.Control
            name="updatecost"
            value={updateProduct.updatecost}
            type="text"
            onChange={handleChangeOnUpdating}
          />

          <Form.Label>Product Color</Form.Label>
          <Form.Control
            name="updatecolor"
            value={updateProduct.updatecolor}
            type="text"
            onChange={handleChangeOnUpdating}
          />

          <Form.Label>Product Category</Form.Label>
          <Form.Control
            name="updatecatid"
            value={updateProduct.updatecatid}
            type="text"
            onChange={handleChangeOnUpdating}
          />

          <Form.Label>Product Supplier</Form.Label>
          <Form.Control
            name="updatesid"
            value={updateProduct.updatesid}
            type="text"
            onChange={handleChangeOnUpdating}
          />

          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            name="updatequantity"
            value={updateProduct.updatequantity}
            type="text"
            onChange={handleChangeOnUpdating}
          />
          <Form.Label>Product Size</Form.Label>
          <Form.Control
            name="updatesize"
            value={updateProduct.updatesize}
            type="text"
            onChange={handleChangeOnUpdating}
          />

          <Form.Label>Product URL</Form.Label>
          <Form.Control
            name="updateurl"
            value={updateProduct.updateurl}
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

export default Product;
