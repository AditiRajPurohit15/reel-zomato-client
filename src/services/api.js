import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})


let activeRequests = 0;

const startLoading = () => {
  activeRequests++;
  document.body.classList.add("loading");
};

const stopLoading = () => {
  activeRequests--;
  if (activeRequests === 0) {
    document.body.classList.remove("loading");
  }
};

api.interceptors.request.use((config) => {
  startLoading();
  return config;
});

api.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);


export default api;