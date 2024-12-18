import axiosInstance from "../../auth/axiosInterceptor";


export const signupService = async (userData) => {
  try {
    const response = await axiosInstance.post(`/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
