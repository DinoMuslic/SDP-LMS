import { useState } from "react";

const MyDatatable = ({ columns, data, rowsPerPage = 5, onReturnBook }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={styles.th} onClick={() => requestSort(col.accessor)}>
                {col.header} {getSortIcon(col.accessor)}
              </th>
            ))}
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={styles.td}>
                No data
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={styles.td}>
                    {row[col.accessor]}
                  </td>
                ))}
                <td style={styles.td}>
                  {row.returned_status === "Returned" ? (
                    <span style={{ color: "gray" }}>Already returned</span>
                  ) : (
                    <button
                      className="my-btn"
                      onClick={() => onReturnBook?.(row.id, row.isbn)}
                    >
                      Return Book
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          className="my-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ◀ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="my-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    border: "2px solid var(--green)",
    marginTop: "50px",
  },
  th: {
    backgroundColor: "var(--green)",
    color: "#fff",
    padding: "10px",
    border: "1px solid #ddd",
    cursor: "pointer",
    userSelect: "none",
  },
  td: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    border: "1px solid #ddd",
  },
  pagination: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default MyDatatable;
