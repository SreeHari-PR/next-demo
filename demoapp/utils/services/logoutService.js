

import axios from 'axios';
const API_URL = 'https://dev.zynact.com/api/profitex';
export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error('Logout error: ' + error.message);
  }
};
