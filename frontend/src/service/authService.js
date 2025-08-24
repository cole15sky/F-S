import apiClient from "../apiClient";

const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post(
        "/login",
        { user: { email, password } },
        { withCredentials: true } // important for cookies
      );

      const { data } = response;
      // Save token if Rails sends JWT
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      return data.data; // { user: {...}, token: ... }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      await apiClient.delete("/logout", { withCredentials: true });
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await apiClient.post(
        "/signup",
        { user: userData },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/me", { withCredentials: true });
      return response.data?.data || null; // prevent null.user errors
    } catch (error) {
      console.error("Error fetching current user:", error.response?.data || error.message);
      return null;
    }
  },
};

export default authService;
