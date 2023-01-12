import axios from "axios";
import { API_URL, EMPLOYEES } from "../utils/Url";

export const fetchEmployees = () => axios.get(`${API_URL}${EMPLOYEES}`);
