import axios from "axios";
import { getBaseUrl } from "@utils/utils";

const BASE_URL = getBaseUrl();

const BorrowService = {
  add: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/borrowings/add`,
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
        `${BASE_URL}/borrowings/all`,
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
        `${BASE_URL}/borrowings/update-late`,
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
        `${BASE_URL}/borrowings/return`,
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
        `${BASE_URL}/borrowings/calculate-fines/${id}`
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
          BASE_URL
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
        `${BASE_URL}/borrowings/total-fines/`
      );
      return response.data.fines;
    } catch (error) {
      return error.response.data.error;
    }
  },

  getAllStudentFines: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/borrowings/calculate-fines/all`);
      return response.data.studentFines;
    } catch (error) {
      return error.response.data.error;
    }
  },
};

export default BorrowService;
