import { useEffect, useState } from "react";
import UserService from "@services/user_service";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await UserService.getStudentsInfo();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (<div>Students page</div>);
};

export default StudentsPage;
