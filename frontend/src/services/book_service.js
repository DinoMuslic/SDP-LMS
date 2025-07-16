import axios from "axios";
import { getBaseUrl } from "@utils/utils";

const BASE_URL = getBaseUrl();

const BookService = {
  get: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books/all`);
      return response.data;
    } catch (error) {
      console.log("Error fetching books:");
    }
  },
  add: async (data) => {
    try {
      await axios.post(`${BASE_URL}/books/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log("Error adding book", error);
    }
  },

  update: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/books/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log("Error updating book", error);
    }
  },
  delete: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/books/delete/${id}`);
    } catch (error) {
      console.log("Error deleting book");
    }
  },
  getBooksInfo: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books/info/all`);
      return response.data;
    } catch (error) {
      console.log("Error geting books");
    }
  },
  getTopBorrowed: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books/top-borrowed`);
      return response.data;
    } catch (error) {
      console.log("Error geting top borrowed books");
    }
  },
  isAvailable: async (title) => {
    try {
      const response = await axios.get(`${BASE_URL}/books/is-available/${title}`);
      if (response.data.amount == 0) return `No available copies of ${title}`;
      return `Book is available (${response.data.amount} copies)`;
    } catch (error) {
      return `Book "${title}" not found`;
    }
  },
};

export default BookService;
