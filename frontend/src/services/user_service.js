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
  add: async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/add`, data);
    } catch (error) {
      console.log("Error adding user.");
    }
  },
  update: async (id, data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/${id}`, data);
    } catch (error) {
      console.log("Error updating user.");
    }
  },
  delete: async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/delete/${id}`);
    } catch (error) {
      console.log("Error deleting user.");
    }
  },
};

export default UserService;
