import axios from "axios";

const PublisherService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/publishers/all`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch publishers:", error);
      return [];
    }
  },

  add: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/publishers/add`,
        data
      );
      return response.data.message;
    } catch (error) {
      return error.response?.data?.error || "Error adding publisher";
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/publishers/update/${id}`,
        data
      );
      return response.data.message;
    } catch (error) {
      return error.response?.data?.error || "Error updating publisher";
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/publishers/delete/${id}`
      );
      return response.data.message;
    } catch (error) {
      return error.response?.data?.error || "Error deleting publisher";
    }
  },
};

export default PublisherService;