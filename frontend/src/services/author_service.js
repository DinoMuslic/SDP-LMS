import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const AuthorService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/authors/all`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching authors.");
    }
  },
  add: async (data) => {
    try {
      await axios.post(`${BASE_URL}/authors/add`, data);
    } catch (error) {
      console.log("Error adding author.");
    }
  },
  update: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/authors/update/${id}`, data);
    } catch (error) {
      console.log("Error updating author.");
    }
  },
  delete: async (id) => {
    try {
        await axios.delete(`${BASE_URL}/authors/delete/${id}`);
    } catch (error) {
        console.log("Error deleting author.");
    }
  },
};

export default AuthorService;
