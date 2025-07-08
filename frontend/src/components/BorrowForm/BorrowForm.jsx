import { useEffect, useState } from "react";
import Select from "react-select";
import MyToast from "@components/Toast/Toast";
import BorrowService from "@services/borrow_service";
import BookService from "@services/book_service";
import "./BorrowForm.css";

const BorrowForm = ({ onDataChange }) => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [date, setDate] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStudents = await BorrowService.getAllStudentFines();
      const fetchedBooks = await BookService.get();
      setStudents(fetchedStudents);
      setBooks(fetchedBooks);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setStudents(students);
    setBooks(books);

    const currentDate = new Date();
    const day =
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate();
    const month =
      currentDate.getMonth() + 1 < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setDate(`${day}/${month}/${year}`);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStudents = await BorrowService.getAllStudentFines();
      const fetchedBooks = await BorrowService.get();
      setStudents(fetchedStudents);
      setBooks(fetchedBooks);
    };
    fetchData();
  }, []);

  const handleBorrow = async () => {
    setToastMessage("");
    setShowToast(false);

    if (!selectedStudent || !selectedBook) {
      setTimeout(() => {
        setToastMessage("Both student and book must be selected.");
        setShowToast(true);
      }, 50);
      return;
    }

    const response = await BorrowService.add({
      student_id: selectedStudent.value,
      isbn: selectedBook.value,
    });

    setToastMessage(response);
    setShowToast(true);
    setSelectedStudent(null);
    setSelectedBook(null);
    if (onDataChange) onDataChange();
  };

  const handleReturn = async () => {
    setToastMessage("");
    setShowToast(false);

    if (!selectedStudent || !selectedBook) {
      setTimeout(() => {
        setToastMessage("Both student and book must be selected.");
        setShowToast(true);
      }, 50);
      return;
    }

    const response = await BorrowService.return({
      student_id: selectedStudent.value,
      isbn: selectedBook.value,
    });

    setToastMessage(response);
    setShowToast(true);
    setSelectedStudent(null);
    setSelectedBook(null);
    if (onDataChange) onDataChange();
  };

  const handleStudentFine = async () => {
    setToastMessage("");
    setShowToast(false);

    const response = selectedStudent
      ? await BorrowService.calculateStudentFines(selectedStudent.value)
      : await BorrowService.calculateAllFines();

    if (response) {
      setToastMessage(response);
      setShowToast(true);
    }
  };

  const studentOptions = students.map((s) => ({
    value: s.id,
    label: `${s.id} - ${s.full_name} (Fines: ${s.total_fines} KM)`,
  }));

  const bookOptions = books.map((b) => ({
    value: b.isbn,
    label: `${b.name} (Quantity: ${b.amount})`,
  }));

  return (
    <>
      <div className="borrow-form-container">
        <div className="borrowing-title">Borrowing for {date}</div>
        <hr />

        <div className="text-input-container">
          <div className="borrow-form-text">Select Student</div>
          <Select
            options={studentOptions}
            value={selectedStudent}
            onChange={setSelectedStudent}
            placeholder="Search or select student..."
            isClearable
          />
          {/* <p style={{ fontSize: 14 }}>To check fines for all students, leave this field empty.</p> */}
        </div>

        <div className="text-input-container">
          <div className="borrow-form-text">Select Book</div>
          <Select
            options={bookOptions}
            value={selectedBook}
            onChange={setSelectedBook}
            placeholder="Search or select book..."
            isClearable
          />
        </div>

        <div className="borrow-btn-container">
          <button className="my-btn" onClick={handleBorrow}>
            Borrow Book
          </button>
          {/* <button className="my-btn" onClick={handleReturn}>
            Return Book
          </button> */}
          <button className="my-btn" onClick={handleStudentFine}>
            Check Total Fines
          </button>
        </div>
      </div>
      {showToast ? <MyToast type="info" message={toastMessage} /> : null}
    </>
  );
};

export default BorrowForm;
