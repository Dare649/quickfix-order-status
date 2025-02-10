import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`, // Use NEXT_PUBLIC_ for client-side access
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
