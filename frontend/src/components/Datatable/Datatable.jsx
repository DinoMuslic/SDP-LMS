import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import DataTable, { createTheme } from "react-data-table-component";

import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import "./Datatable.css";

const Datatable = ({ data }) => {
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const customStyles = {
    table: {
      style: {
        borderRadius: "15px",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        minHeight: "50px",
      },
      stripedStyle: {
        backgroundColor: "#9bebbf;",
        color: "#000000",
      },
    },
    header: {
      style: {
        color: "#156e3d",
        fontSize: "48px",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "#dbdbdb",
        color: "#000000",
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
      style: {
        fontSize: "18px",
      },
      pageButtonsStyle: {
        fontSize: "18px",
        borderRadius: "5px",
      },
    },
  };

  const [type, setType] = useState("users");

  const handleOptionClick = (event) => {
    setType(event.target.value);
    console.log(type);
  };

  const columns =
    type === "users"
      ? [
          {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
          },
          {
            name: "First Name",
            selector: (row) => row.first_name,
            sortable: true,
          },
          {
            name: "Last Name",
            selector: (row) => row.last_name,
            sortable: true,
          },
          {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
          },
          {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
          },
          {
            name: "Actions",
            cell: () => (
              <div>
                <FaEdit
                  className="data-table-icon ms-1 me-3"
                  color="blue"
                  size={"20px"}
                />
                <FaRegTrashAlt
                  className="data-table-icon"
                  color="red"
                  size={"20px"}
                />
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
          },
        ]
      : type === "books"
      ? [
          {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
          },
          {
            name: "ISBN",
            selector: (row) => row.isbn,
            sortable: true,
          },
          {
            name: "Artist",
            selector: (row) => row.artist,
            sortable: true,
          },
          {
            name: "Actions",
            cell: () => (
              <div>
                <FaEdit
                  className="data-table-icon ms-1 me-3"
                  color="blue"
                  size={"20px"}
                />
                <FaRegTrashAlt
                  className="data-table-icon"
                  color="red"
                  size={"20px"}
                />
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
          },
        ]
      : type === "artists"
      ? [
          {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
          },
          {
            name: "First Name",
            selector: (row) => row.first_name,
            sortable: true,
          },
          {
            name: "Last Name",
            selector: (row) => row.last_name,
            sortable: true,
          },
          {
            name: "Birth Year",
            selector: (row) => row.birth_year,
            sortable: true,
          },
          {
            name: "Death Year",
            selector: (row) => row.death_year,
            sortable: true,
          },
          {
            name: "Actions",
            cell: () => (
              <div>
                <FaEdit
                  className="data-table-icon ms-1 me-3"
                  color="blue"
                  size={"20px"}
                />
                <FaRegTrashAlt
                  className="data-table-icon"
                  color="red"
                  size={"20px"}
                />
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
          },
        ]
      : [];

  const [filterText, setFilterText] = useState("");
  const [resetPagination, setResetPagination] = useState(false);

  const handleFilter = (event) => {
    setFilterText(event.target.value);
    setResetPagination(!resetPagination);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Form.Select className="datatable-select">
          <option onClick={handleOptionClick} value="users">
            Users
          </option>
          <option onClick={handleOptionClick} value="books">
            Books
          </option>
          <option onClick={handleOptionClick} value="artists">
            Artists
          </option>
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
        fixedHeader={true}
        fixedHeaderScrollHeight="500px"
        responsive
        striped
        customStyles={customStyles}
        noDataComponent={<div>No Data</div>}
      />
    </div>
  );
};

export default Datatable;
