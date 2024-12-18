import axios from "axios";

export const fetchProfile = async (token: string) => {
  try {
    const response = await axios.get('https://dev.zynact.com/api/profitex/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch profile.");
    }
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
};
