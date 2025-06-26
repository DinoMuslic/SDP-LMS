import { useEffect, useState } from "react";
import BorrowForm from "@components/BorrowForm/BorrowForm";
import Datatable from "@components/Datatable/MyDatatable";
import BorrowService from "@services/borrow_service";
import { useNavigate } from "react-router-dom";

const BorrowingsPage = () => {
  if (localStorage.getItem("role") !== "librarian") {
    const navigate = useNavigate();
    navigate("/home");
  }

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    await BorrowService.updateLateBorrowings();
    const fetchedData = await BorrowService.get();
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-5">
      <div className="w-100 text-center h1 c-green">Book Borrowing</div>
      <div className="my-center-container">
        <BorrowForm onDataChange={fetchData} />
      </div>

      <div className="w-25">
        <input
          type="text"
          className="form-control"
          placeholder="Search borrowings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Datatable columns={columns} data={filteredData} rowsPerPage={10} />
    </div>
  );
};

const columns = [
  { header: "Student ID", accessor: "id" },
  { header: "Student Name", accessor: "full_name" },
  { header: "Book ISBN", accessor: "isbn" },
  { header: "Book Title", accessor: "name" },
  { header: "Borrow Date", accessor: "borrow_date" },
  { header: "Due Date", accessor: "return_date" },
  { header: "Status", accessor: "returned_status" },
  { header: "Fine", accessor: "fine" },
];

export default BorrowingsPage;
