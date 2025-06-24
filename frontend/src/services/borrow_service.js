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
};

export default BorrowService;
