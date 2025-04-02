import { axios } from "../hooks/axios";

export const getSessionById = async (id) => {
  const { data } = await axios.get(`/journal-sessions/session/${id}`);
  console.log(data);
  return data;
};

export const saveNote = async (allNotes) => {
  await axios.post(`/journal-entries`, {
    qas: allNotes,
  });
};
