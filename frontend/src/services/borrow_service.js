import axios from "axios";

const BorrowService = {
  add: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/borrowings/add`,
        data
      );
      return response.data.message;
    } catch (error) {
    //   console.log(error.response.data.error);
      return error.response.data.error;
    }
  },
};

export default BorrowService;
