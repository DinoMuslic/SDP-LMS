import axios from "axios";

const AuthorService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/authors/all`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching authors.");
    }
  },
  add: async (data) => {
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/authors/add`, data);
    } catch (error) {
      console.log("Error adding author.");
    }
  },
  update: async (id, data) => {
    try {
      axios.put(`${import.meta.env.VITE_API_URL}/authors/update/${id}`, data);
    } catch (error) {
      console.log("Error updating author.");
    }
  },
  delete: async (id) => {
    try {
        axios.delete(`${import.meta.env.VITE_API_URL}/authors/delete/${id}`);
    } catch (error) {
        console.log("Error deleting author.");
    }
  },
};

export default AuthorService;
