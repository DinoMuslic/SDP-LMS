import axios from "axios";

const BorrowService = {
  add: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/borrowings/add`,
        data
      );
      return response.data.message;
    } catch (error) {
      return error.response.data.error;
    }
  },

  get: async (data) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/borrowings/all`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },

  updateLateBorrowings: async (data) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/borrowings/update-late`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },

  return: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/borrowings/return`,
        data
      );
      return response.data.message;
    } catch (error) {
      return error.response.data.error;
    }
  },

  calculateStudentFines: async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/borrowings/calculate-fines/${id}`
      );
      return response.data.fines;
    } catch (error) {
      return error.response.data.error;
    }
  },

  calculateStudentFinesProfile: async (id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/borrowings/calculate-fines-profile/${id}`
      );
      return response.data.fines;
    } catch (error) {
      return error.response.data.error;
    }
  },

  calculateAllFines: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/borrowings/total-fines/`
      );
      return response.data.fines;
    } catch (error) {
      return error.response.data.error;
    }
  },

  getAllStudentFines: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/borrowings/calculate-fines/all`);
      return response.data.studentFines;
    } catch (error) {
      return error.response.data.error;
    }
  },
};

export default BorrowService;
