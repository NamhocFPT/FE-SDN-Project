import React, { createContext, useContext, useReducer, useEffect } from 'react';

// --- Bước 1: Định nghĩa State ban đầu và Reducer ---
// (Bạn có thể chuyển file này ra src/reducer/authReducer.js nếu muốn)

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true, // Bắt đầu ở trạng thái loading để kiểm tra localStorage
};

// Định nghĩa các hành động
const ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// --- Bước 2: Tạo Context ---
const AuthContext = createContext();

// --- Bước 3: Tạo Provider Component ---
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Kiểm tra localStorage khi component mount (tải lại trang)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token'); // Giả sử bạn cũng lưu token

      if (storedUser && storedToken) {
        // Nếu có, dispatch action đăng nhập
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          payload: { user: JSON.parse(storedUser) },
        });
      } else {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    } catch (error) {
      console.error("Failed to load auth state from storage", error);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // --- Các hàm trợ giúp ---
  const login = (userData, token) => {
    // Lưu vào localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token); // Lưu token để gọi API

    // Dispatch action
    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: { user: userData },
    });
  };

  const logout = () => {
    // Xóa khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Dispatch action
    dispatch({ type: ACTIONS.LOGOUT });
  };

  // Cung cấp state và các hàm cho các component con
  const value = {
    ...state, // Gửi đi isAuthenticated, user, loading
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Bước 4: Tạo Custom Hook `useAuth` ---
// Hook này để các component khác dễ dàng lấy dữ liệu
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};