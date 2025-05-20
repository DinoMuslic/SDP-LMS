import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { capitalizeFirstLetter } from "@utils/utils";

import DeleteModal from "@components/DeleteModal/DeleteModal";
import UserService from "@services/user_service";
import AuthorService from "@services/author_service";
import BookService from "@services/book_service";

import "./Datatable.css";

const Datatable = ({ data, type, setType, onRowAction, onDataChange }) => {
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  
  const customStyles = {
    table: {
      style: { borderRadius: "15px" },
    },
    rows: {
      style: { fontSize: "16px", minHeight: "50px" },
      stripedStyle: { backgroundColor: "#9bebbf", color: "#000" },
    },
    header: {
      style: { color: "#156e3d", fontSize: "48px" },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "#dbdbdb",
        color: "#000",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#0f4e2c",
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    pagination: {
      style: { fontSize: "18px" },
      pageButtonsStyle: { fontSize: "18px", borderRadius: "5px" },
    },
  };

  
  const columnsMap = {
    users: [
      { name: "ID", selector: row => row.id, sortable: true },
      { name: "First Name", selector: row => row.first_name, sortable: true },
      { name: "Last Name", selector: row => row.last_name, sortable: true },
      { name: "Email", selector: row => row.email, sortable: true },
      { name: "Role", selector: row => row.role, sortable: true },
    ],
    books: [
      { name: "ID", selector: row => row.id, sortable: true },
      { name: "ISBN", selector: row => row.isbn, sortable: true },
      { name: "Title", selector: row => row.name, sortable: true },
      { name: "Genre", selector: row => row.genre, sortable: true },
      { name: "Publication Year", selector: row => row.year_of_publication, sortable: true },
      { name: "Publisher ID", selector: row => row.publisher_id, sortable: true },
      { name: "Author ID", selector: row => row.author_id, sortable: true },
    ],
    authors: [
      { name: "ID", selector: row => row.id, sortable: true },
      { name: "First Name", selector: row => row.first_name, sortable: true },
      { name: "Last Name", selector: row => row.last_name, sortable: true },
      { name: "Year of Birth", selector: row => row.year_of_birth, sortable: true },
      { name: "Year of Death", selector: row => row.year_of_death, sortable: true },
    ],
  };


  const actionColumn = {
    name: "Actions",
    cell: row => (
      <div>
        <FaEdit
          className="data-table-icon ms-1 me-3"
          color="blue"
          size="20px"
          onClick={() => onRowAction("edit", row, type)}
        />
        <FaRegTrashAlt
          className="data-table-icon"
          color="red"
          size="20px"
          onClick={() => {
            setSelectedRow(row);
            setShowDeleteModal(true);
          }}
        />
      </div>
    ),
    ignoreRowClick: true,
  };

  const columns = [...(columnsMap[type] || []), actionColumn];

 
  const [filterText, setFilterText] = useState("");
  const [resetPagination, setResetPagination] = useState(false);
  const handleFilter = e => {
    setFilterText(e.target.value);
    setResetPagination(!resetPagination);
  };
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );


  const handleDelete = async () => {
    try {
      if (type === "users") {
        await UserService.delete(selectedRow.id);
      } else if (type === "authors") {
        await AuthorService.delete(selectedRow.id);
      }
      else if (type === "books") {
        await BookService.delete(selectedRow.id);
      }
      onDataChange();
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <Form.Select
          className="datatable-select"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="users">Users</option>
          <option value="books">Books</option>
          <option value="authors">Authors</option>
        </Form.Select>

        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={handleFilter}
          className="form-control ms-3 mb-3"
          style={{ maxWidth: "300px" }}
        />
      </div>

      <DataTable
        title={capitalizeFirstLetter(type)}
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPagination}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        responsive
        striped
        customStyles={customStyles}
        noDataComponent={<div>No Data</div>}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        entity={selectedRow ? `${type.slice(0, -1)} ${selectedRow.id}` : ""}
      />
    </>
  );
};

export default Datatable;
