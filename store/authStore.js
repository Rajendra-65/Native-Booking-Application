import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch("https://mern-book-app-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong")

      await AsyncStorage.setItem("user", JSON.stringify(data.user))
      await AsyncStorage.setItem("token", data.token)

      set({ token: data.token, user: data.user, isLoading: false })

      return {
        success: true
      }
    } catch (e) {
      set({ isLoading: false })
      return {
        success: false,
        error: e.message
      }
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user })
    } catch (e) {
      console.log("Auth Check Failed", e)
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null })

  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      console.log("code reached above response")
      const response = await fetch("https://mern-book-app-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json();

      if (data?.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        set({isLoading:false})
      } else {
        console.warn("user data missing from response");
        set({ isLoading: false });
      }

      if (data?.token) {
        await AsyncStorage.setItem("token", data.token);
      } else {
        console.warn("token missing from response");
        set({ isLoading: false });
      }

      return { success: true }
    } catch (e) {
      set({ isLoading: false })
      return { success: false, error: e.message }
    }
  }

}));
