import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false,
});

// ✅ routes PUBLICS où on n'envoie jamais Bearer
const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/activate",
  "/auth/forgot-password",
  "/auth/reset-password",
];

// helper: check si l'URL est public
function isPublicRequest(url = "") {
  // url peut être "/auth/forgot-password" ou "http://..."
  return PUBLIC_PATHS.some((p) => url.includes(p));
}

api.interceptors.request.use((config) => {
  const url = config?.url || "";

  // ✅ pas de Bearer sur routes public
  if (!isPublicRequest(url)) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } else {
    // au cas où axios garde un header d'avant
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;

    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : null) ||
      error.message ||
      "Erreur inconnue";

    return Promise.reject({ status, message, raw: error });
  }
);

export default api;
