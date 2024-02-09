// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Изначально данные пользователя пусты
  isAuthenticated: false, // Изначально пользователь не аутентифицирован
};

// localStorage
const loadUserFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
    return null;
  };

const authSlice = createSlice({
  name: 'auth',
//   initialState,
  initialState: {
    ...initialState,
    user: loadUserFromLocalStorage(),
    isAuthenticated: !!loadUserFromLocalStorage(),
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Обновляем данные пользователя
      state.isAuthenticated = true; // Устанавливаем флаг аутентификации в true
    //   localStorage
      try {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    },
    clearUser(state) {
      state.user = null; // Очищаем данные пользователя
      state.isAuthenticated = false; // Устанавливаем флаг аутентификации в false
    //   localStorage
    try {
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user from localStorage:', error);
      }
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
