import { api } from "../axios";


export const getFormations = async () => {
  const {data}  = await api.get("/directeurLabo/formations", {
  });
  return data;
};




