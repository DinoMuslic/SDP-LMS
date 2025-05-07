import axios from "axios";

const BookService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/all`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching books.");
    }
  },
  add: async (data) => {
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/books/add`, data);
    } catch (error) {
      console.log("Error adding book.");
    }
  },
  update: async (id, data) => {
    try {
      axios.put(`${import.meta.env.VITE_API_URL}/books/update/${id}`, data);
    } catch (error) {
      console.log("Error updating book.");
    }
  },
  delete: async (id) => {
    try {
        axios.delete(`${import.meta.env.VITE_API_URL}/books/delete/${id}`);
    } catch (error) {
        console.log("Error deleting book.");
    }
  },
};

export default BookService;
