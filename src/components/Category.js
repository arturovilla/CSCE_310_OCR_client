import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";

import "./../App.css";

function Category() {
  const [Categorys, setCategorys] = useState([]);
  const [newCategory, setNewCategory] = useState({
    catid: "",
    category_name: ""
  });
  const [updateCategory, setUpdateCategory] = useState({
    updatecatid: newCategory.updatecatid,
    updatecategory_name: newCategory.category_name
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Category ID",
        accessor: "catid",
      },
      {
        Header: "Name",
        accessor: "category_name",
      },
	  {	
        Header: "Actions",
        accessor: "actions",       
		Cell: (row) => (
			<div>
			  <Button
				variant="info"
				size="sm"
				onClick={() => handleOpenModal(row.cell.row.original.catid)}
			  >
				Update
			  </Button>{" "}
			  <Button
				variant="danger"
				size="sm"
				onClick={() => handleDelete(row.cell.row.original.catid)}
			  >
				Delete
			  </Button>
			</div>	
        ),				
      },	
    ],
    []
  );
  const data = [...Categorys];
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    const getCategorys = async () => {
      const res = await axios.get(
        `http://localhost:3001/CategoryDML`
      );
      setCategorys(res.data);
    };
    getCategorys();
  }, []);

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateCategory({
      ...updateCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3001/CategoryDML`,
      newCategory
    );
    if (res.data.name === "error") alert("Error when creating Category"+ ":" + res.data.detail);
    else {
      alert("A new Category has been created");
      const res = await axios.get(
        `http://localhost:3001/CategoryDML`
      );
      setCategorys(res.data);
      setNewCategory({catid: "",
      category_name: ""});
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:3001/CategoryDML/` +
        actualUpdatingId,
      {
        category_name: updateCategory.updatecategory_name
      }
    );
    if (res.data.name === "error") alert("Error while updating Category");
    else {
      alert("Category has been updated");
      const res = await axios.get(
        `http://localhost:3001/CategoryDML`
      );
      setCategorys(res.data);
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
      `http://localhost:3001/CategoryDML/` +
        id
    );
	if (res.data.name === "error") alert("Error while deleting Category");
	else
	{
      alert("Category has been deleted" );
       const res = await axios.get(
       `http://localhost:3001/CategoryDML`
        );
      setCategorys(res.data);
	}
  };

  return (
    <Container fluid="sm" className="p-3">
      <h1>Category</h1>

      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            name="category_name"
            value={newCategory.category_name}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Add Category</Button>
      </Form>

      <h2>List of Categorys</h2>
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
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                name="updatecategory_name"
                value={updateCategory.updatecategory_name}
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

export default Category;