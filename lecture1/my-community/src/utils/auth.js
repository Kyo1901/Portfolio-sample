import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

/**
 * 회원가입 함수
 * @param {string} username - 사용자 아이디
 * @param {string} password - 비밀번호
 * @param {string} nickname - 닉네임
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function signUp(username, password, nickname) {
  try {
    // 중복 아이디 확인
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return { success: false, error: '이미 존재하는 아이디입니다.' };
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          password: hashedPassword,
          nickname,
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 로그인 함수
 * @param {string} username - 사용자 아이디
 * @param {string} password - 비밀번호
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function signIn(username, password) {
  try {
    // 사용자 조회
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
    }

    // 비밀번호 검증
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
    }

    // 비밀번호 제거 후 반환
    const { password: _, ...userData } = user;

    return { success: true, data: userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 로그아웃 함수
 */
export function signOut() {
  localStorage.removeItem('user');
}

/**
 * 현재 로그인된 사용자 정보 가져오기
 * @returns {object | null}
 */
export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * 사용자 정보 저장
 * @param {object} user - 사용자 정보
 */
export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}
