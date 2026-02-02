import api from "../axios";

export const getResultatsCommissions = async (page = 0, size = 10) => {
  const { data } = await api.get("/directeurLabo/resultats", {
    params: { page, size }
  });

  return data.data; 
};

