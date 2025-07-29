import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export const getAlbaForms = async (params: {
  recruit?: string;
  isPublic?: string;
  sort?: string;
  search?: string;
}) => {
  const res = await axios.get(`${API_URL}/${TEAM_ID}/forms`, { params });
  return res.data;
};

export const scrapAlbaForm = async (formId: number) => {
  return axios.post(`${API_URL}/${TEAM_ID}/forms/${formId}/scrap`);
};

export const cancelScrapAlbaForm = async (formId: number) => {
  return axios.delete(`${API_URL}/${TEAM_ID}/forms/${formId}/scrap`);
};
