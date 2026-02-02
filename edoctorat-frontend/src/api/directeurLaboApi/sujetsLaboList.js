import {api} from "../axios";

export const getSujetsLaboList = async () => {
  const { data } = await api.get("/directeurLabo/sujetsLaboList", {
  });
  return data;
};