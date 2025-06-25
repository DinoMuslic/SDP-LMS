import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const BookService = {
  get: async () => {
    try {
      const response = await axios.get(
        `${URL}/books/all`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching books:");
    }
  },
  add: async data => {
    try {
      await axios.post(`${URL}/books/add`, data);
    } catch (error) {
      console.log("Error adding book");
    }
  },
  update: async (id, data) => {
    try {
      await axios.put(`${URL}/books/update/${id}`, data);
    } catch (error) {
      console.log("Error updating book");
    }
  },
  delete: async id => {
    try {
        await axios.delete(`${URL}/books/delete/${id}`);
    } catch (error) {
        console.log("Error deleting book");
    }
  },
  getBooksInfo: async() => {
    try {
      const response = await axios.get(`${URL}/books/info/all`);
      return response.data;
    } catch (error) {
      console.log("Error geting books");
    }
  },
  getTopBorrowed: async() => {
    try {
      const response = await axios.get(`${URL}/books/top-borrowed`);
      return response.data;
    } catch (error) {
      console.log("Error geting top borrowed books");
    }
  },
  isAvailable: async title => {
    try {
      const response = await axios.get(`${URL}/books/is-available/${title}`);
      if(response.data.amount == 0) return `No available copies of ${title}`
      return `Book is available (${response.data.amount} copies)`;
    } catch (error) {
      return `Book "${title}" not found`;
    }
  }
};

export default BookService;
