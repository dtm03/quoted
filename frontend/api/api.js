import axios from "axios";

const ADDRESS = "http://192.168.178.25:8080/";

export const createUser = async () => {
  try {
    const response = await axios.post(ADDRESS + "user");
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const createQuote = async (userId, quote, author) => {
  try {
    await axios.post(ADDRESS + `quote/${userId}`, {
      quote: quote,
      author: author
    });
  } catch (error) {
    console.error("Error creating the quote:", error);
  }
};

export const fetchQuotes = async (userId) => {
  try {
    const response = await axios.get(ADDRESS + `quote/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes for user:", error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(ADDRESS + `user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all quotes:", error);
  }
};

export const deleteQuote = async (userId, quoteId) => {
  try {
    await axios.delete(ADDRESS + `quote/${userId}/${quoteId}`);
  } catch (error) {
    console.error("Error deleting quote:", error);
  }
};
