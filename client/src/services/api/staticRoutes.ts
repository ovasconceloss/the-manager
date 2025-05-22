import axiosClient from "./config/axiosConfig";

export const fetchStaticClubsByNation = async (nation: string) => {
  const response = await axiosClient.get(`/static/club/all/${nation}`);
  return response.data;
};

export const createSaveDatabase = async () => {
  const response = await axiosClient.post('/static/manager/create', { saveConfirm: true });
  return response.data;
}