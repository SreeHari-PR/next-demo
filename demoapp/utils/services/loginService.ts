import axios from 'axios';
import axiosInstance from '@/utils/auth/axiosInterceptor'

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export const loginUser = async (payload: LoginPayload): Promise<string> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      '/login',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
     console.log(response.data,'jkjjkkjk')
    if (response.data.success && response.data.data) {
      return response.data.data; 
    } else {
      throw new Error(response.data.message || 'Login failed.');
    }
  } catch (error: any) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};
