import axios from "axios";

export default axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json",
  },
});
