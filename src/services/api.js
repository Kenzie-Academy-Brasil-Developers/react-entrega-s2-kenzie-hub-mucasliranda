import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://kenziehub.herokuapp.com",
})

export default api