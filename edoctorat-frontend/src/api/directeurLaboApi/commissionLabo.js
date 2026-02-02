import api from "../axios";

export const fetchCommissions = async (page = 0, size = 10) => {
  const { data } = await api.get("/directeurLabo/commissions", {
    params: { page, size },
  });
  console.log("Commissions data : ",data)
  return data;
};



export const createCommission = async (payload) => {
  const { data } = await api.post(
    "/directeurLabo/commissions",
    payload
  );
  return data;
};

export const updateCommission = async ({ id, payload }) => {
  const { data } = await api.put(
    `/directeurLabo/commissions/${id}`,
    payload
  );
  return data;
};

export const deleteCommission = async (id) => {
  await api.delete(`/directeurLabo/commissions/${id}`);
};
