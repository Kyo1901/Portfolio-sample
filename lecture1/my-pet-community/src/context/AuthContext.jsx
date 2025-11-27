import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * AuthProvider 컴포넌트
 *
 * Props:
 * @param {ReactNode} children - 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <AuthProvider><App /></AuthProvider>
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const { data, error } = await supabase
        .from('pet_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;

      if (data) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return { success: true };
      }

      return { success: false, error: '아이디 또는 비밀번호가 일치하지 않습니다.' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (username, password, nickname) => {
    try {
      const { data: existingUser } = await supabase
        .from('pet_users')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        return { success: false, error: '이미 사용 중인 아이디입니다.' };
      }

      const { data, error } = await supabase
        .from('pet_users')
        .insert([{ username, password, nickname }])
        .select()
        .single();

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
