import {api} from "../axios";

export const getProfs = async () => {
  const { data } = await api.get("/directeurLabo/professeurs", {
  });
  return data;
};




