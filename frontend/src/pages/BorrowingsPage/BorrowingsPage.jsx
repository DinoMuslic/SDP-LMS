import { useEffect, useState } from "react";
import BorrowForm from "@components/BorrowForm/BorrowForm";
import Datatable from "@components/Datatable/MyDatatable";
import BorrowService from "@services/borrow_service";

const BorrowingsPage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await BorrowService.updateLateBorrowings();
    const fetchedData = await BorrowService.get();
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <div className="w-100 text-center h1 c-green">Book Borrowing</div>
      <div className="my-center-container">
        <BorrowForm onDataChange={fetchData} />
      </div>
      <Datatable columns={columns} data={data} rowsPerPage={10} />
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