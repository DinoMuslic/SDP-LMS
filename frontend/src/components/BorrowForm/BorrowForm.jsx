import { useEffect, useState } from "react";
import MyToast from "@components/Toast/Toast";
import BorrowService from "@services/borrow_service";
import "./BorrowForm.css";

const BorrowForm = ({ onDataChange }) => {
  const [studentId, setStudentId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [date, setDate] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const currentDate = new Date();
  const day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
  let month =
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  useEffect(() => {
    setDate(`${day}/${month}/${year}`);
  }, []);

  const handleStudentInput = (e) => {
    setStudentId(e.target.value);
  };

  const handleIsbnInput = (e) => {
    setIsbn(e.target.value);
  };

  const handleBorrow = async () => {
    setToastMessage("");
    setShowToast(false);

    if (studentId === "" || isbn === "") {
      setShowToast(false);
      setTimeout(() => {
        setToastMessage("All fields are required");
        setShowToast(true);
      }, 50);
      return;
    }

    const response = await BorrowService.add({
      student_id: studentId,
      isbn: isbn,
    });

    setToastMessage(response);
    setShowToast(true);

    setStudentId("");
    setIsbn("");
    if (onDataChange) {
      onDataChange();
    }
  };

  const handleReturn = async () => {
    setToastMessage("");
    setShowToast(false);

    if (studentId === "" || isbn === "") {
      setShowToast(false);
      setTimeout(() => {
        setToastMessage("All fields are required");
        setShowToast(true);
      }, 50);
      return;
    }

    const response = await BorrowService.return({
      student_id: studentId,
      isbn: isbn,
    });

    setToastMessage(response);
    setShowToast(true);

    setStudentId("");
    setIsbn("");
    if (onDataChange) {
      onDataChange();
    }
  };

  const handleStudentFine = async () => {
    setToastMessage("");
    setShowToast(false);

    const response =
      studentId !== "" && studentId !== null
        ? await BorrowService.calculateStudentFines(studentId)
        : await BorrowService.calculateAllFines();

    if (response) {
      setToastMessage(response);
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="borrow-form-container">
        <div className="borrowing-title">Borrowing for {date}</div>
        <hr />
        <div className="text-input-container">
          <div className="borrow-form-text">Student ID</div>
          <input
            name="student_id"
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={handleStudentInput}
          />
          <button className="my-btn" onClick={handleStudentFine}>
            Check Fines
          </button>
          <p style={{fontSize: 14}}>To check total fines for all students leave the Student ID field empty</p>
        </div>
        <div className="text-input-container">
          <div className="borrow-form-text">Book ISBN</div>
          <input
            name="isbn"
            type="text"
            placeholder="Enter Book ISBN"
            value={isbn}
            onChange={handleIsbnInput}
          />
        </div>
        <div className="borrow-btn-container">
          <button className="my-btn" onClick={handleReturn}>
            Return Book
          </button>
          <button className="my-btn" onClick={handleBorrow}>
            Borrow Book
          </button>
        </div>
      </div>
      {showToast ? <MyToast type="info" message={toastMessage} /> : null}
    </>
  );
};

export default BorrowForm;
