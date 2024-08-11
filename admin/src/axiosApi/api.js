import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/acms/api/v2",
});

export default api;