import axios from "axios";

const UserService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching users.");
    }
  },
  update: async (id, data) => {
    try {
      axios.put(`${import.meta.env.VITE_API_URL}/users/${id}`, data);
    } catch (error) {
      console.log("Error updating user.");
    }
  },
  delete: async (id) => {
    try {
        axios.delete(`${import.meta.env.VITE_API_URL}/users/delete/${id}`);
    } catch (error) {
        console.log("Error deleting user.");
    }
  },
};

export default UserService;
