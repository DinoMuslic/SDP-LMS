import { useEffect, useState } from "react";
import AuthService from "@services/auth_service";
import Datatable from "@components/Datatable/Datatable";
import MyModal from "@components/Modal/MyModal";
import UserService from "@services/user_service";
import AuthorService from "@services/author_service";
import BookService from "@services/book_service";

const DashboardPage = () => {
  AuthService.checkAuth();
  const [modalType, setModalType] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTable, setSelectedTable] = useState("users");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      if (selectedTable === "users") {
        const userData = await UserService.get();
        setData(userData);
      } else if (selectedTable === "authors") {
        const authorData = await AuthorService.get();
        setData(authorData);
      } else if (selectedTable === "books") {
        const bookData = await BookService.get();
        setData(bookData);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleRowAction = (action, rowData, tableType) => {
    setModalType(tableType.slice(0, -1));
    setModalAction(action);
    setSelectedRow(rowData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    setModalType(null);
    setModalAction(null);
  };

  const handleFormSubmit = async (data) => {
    if (modalType === "user") {
      if (modalAction === "edit") await UserService.update(data.id, data);
      else if (modalAction === "add") await UserService.add(data);
    } else if (modalType === "author") {
      if (modalAction === "edit") await AuthorService.update(data.id, data);
      else if (modalAction === "add") await AuthorService.add(data);
    } else if (modalType === "book") {
      if (modalAction === "edit") await BookService.update(data.id, data);
      else if (modalAction === "add") await BookService.add(data);
    }

    setRefreshTrigger((prev) => prev + 1);
    handleCloseModal();
  };

  const handleDataChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger, selectedTable]);

  return (
    <div className="p-5">
      <div className="mb-5">
        <button
          className="my-btn"
          onClick={() => {
            setModalType("user");
            setModalAction("add");
            setSelectedRow(null);
            setShowModal(true);
          }}
        >
          Add User
        </button>
        <button
          className="my-btn"
          onClick={() => {
            setModalType("author");
            setModalAction("add");
            setSelectedRow(null);
            setShowModal(true);
          }}
        >
          Add Author
        </button>
        <button
          className="my-btn"
          onClick={() => {
            setModalType("book");
            setModalAction("add");
            setSelectedRow(null);
            setShowModal(true);
          }}
        >
          Add Book
        </button>
      </div>
      <Datatable
        key={refreshTrigger}
        data={data}
        type={selectedTable}
        setType={setSelectedTable}
        onRowAction={handleRowAction}
        onDataChange={handleDataChange}
      />
      <MyModal
        show={showModal}
        type={modalType}
        action={modalAction}
        handleClose={handleCloseModal}
        initialData={selectedRow || {}}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default DashboardPage;
