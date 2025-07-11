import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const UserService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching users.");
    }
  },
  add: async (data) => {
    try {
      await axios.post(`${BASE_URL}/users/add`, data);
    } catch (error) {
      console.log("Error adding user.");
    }
  },
  update: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/users/${id}`, data);
    } catch (error) {
      console.log("Error updating user.");
    }
  },
  delete: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/users/delete/${id}`);
    } catch (error) {
      console.log("Error deleting user.");
    }
  },
  getStudentsInfo: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/students/`
      );
      return response.data;
    } catch (error) {
      console.log("Error getting student info");
    }
  },
  changePassword: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/change-password/`,
        data
      );
      return response.data;
    } catch (error) {
      console.log("Error getting student info");
    }
  }
};

export default UserService;
