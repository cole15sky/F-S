import apiClient from "../apiClient";

const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/users/sign_in', {
        user: { email, password }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.delete('/users/sign_out');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await apiClient.post('/users', {
        user: userData
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
    getCurrentUser: async () => {
        try {
        const response = await apiClient.get('/users/current');
        return response.data;
        } catch (error) {
        throw error;
        }
    }
};

export default authService;