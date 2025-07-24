import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

const baseURL = `${API_URL}${TEAM_ID}/`;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
