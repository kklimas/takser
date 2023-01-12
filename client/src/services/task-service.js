import axios from "axios";
import { API_URL, TASKS } from "../utils/Url";

export const fetchTasks = () => axios.get(`${API_URL}${TASKS}`);

export const createTask = (data) =>
  axios.post(`${API_URL}${TASKS}/create`, data);

export const deleteTasks = (ids) =>
  axios.delete(`${API_URL}${TASKS}/delete`, { data: { ids: ids } });

export const assignTasks = (tasks) =>
  axios.post(`${API_URL}${TASKS}/assign`, tasks);
