import { useEffect, useState } from "react";
import BorrowForm from "@components/BorrowForm/BorrowForm";
import Datatable from "@components/Datatable/MyDatatable";
import BorrowService from "@services/borrow_service";
import MyToast from "@components/Toast/Toast";

const BorrowingsPage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const fetchData = async () => {
    await BorrowService.updateLateBorrowings();
    const fetchedData = await BorrowService.get();
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async (studentId, isbn) => {
    const response = await BorrowService.return({ id: studentId, isbn });
    setToastMessage(response);
    setShowToast(true);
    await fetchData();
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div className="p-5">
      <div className="w-100 text-center h1 c-green">Book Borrowing</div>

      <div className="my-center-container">
        <BorrowForm onDataChange={fetchData} />
      </div>

      <div className="w-25 mt-4 b">
        <input
          type="text"
          className="form-control border border-success"
          placeholder="Search borrowings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Datatable
        columns={columns}
        data={filteredData}
        rowsPerPage={10}
        onReturnBook={handleReturn}
      />

      {showToast && <MyToast type="info" message={toastMessage} />}
    </div>
  );
};

export default BorrowingsPage;
