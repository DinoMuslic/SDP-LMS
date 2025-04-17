import { useEffect, useState } from "react";
import AuthService from "@services/auth_service";
import Datatable from "@components/Datatable/Datatable";
import MyModal from "@components/Modal/MyModal";
import UserService from "@services/user_service";

const DashboardPage = () => {
  AuthService.checkAuth();
  const [modalType, setModalType] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTable, setSelectedTable] = useState("users");
  const [userData, setUserData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUserData = async () => {
    const data = await UserService.get();
    setUserData(data);
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
    console.log("Form submitted:", data);
    
    // Handle different actions
    if (modalAction === "edit") {
      await UserService.update(data);
    } else if (modalAction === "add") {
      await UserService.create(data);
    }
    
    // After successful form submission, trigger a refresh
    setRefreshTrigger(prev => prev + 1);
    handleCloseModal();
  };

  // Handle data refresh after delete from Datatable component
  const handleDataChange = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshTrigger]);

  return (
    <div className="p-5">
      <Datatable
        data={userData}
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
        initialData={selectedRow}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default DashboardPage;