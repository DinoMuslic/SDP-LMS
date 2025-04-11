import DataTable, { createTheme } from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import "./Datatable.css";

const Datatable = ({ type, data }) => {
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
        backgroundColor: "#b0bec5",
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
        backgroundColor: "#90a4ae",
        color: "#ffffff",
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
      : null;

  return (
    <DataTable
      title={capitalizeFirstLetter(type)}
      columns={columns}
      data={data}
      pagination
      fixedHeader={true}
      fixedHeaderScrollHeight="500px"
      responsive
      striped
      customStyles={customStyles}
    />
  );
};

export default Datatable;
