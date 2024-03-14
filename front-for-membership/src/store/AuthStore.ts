// src/store/AuthStore.ts
import { create } from "zustand"
import { devtools, persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
}

interface AuthState {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create(
    devtools(
        (set): AuthState => ({
            user: null,
            login: async (email: string, password: string) => {
                // 여기에서 실제 로그인 API를 호출하여 사용자를 인증하고 로그인 상태를 관리합니다.
                // 예시를 위해 setTimeout을 사용하여 가짜 API 호출을 시뮬레이션합니다.
                setTimeout(() => {
                    // 가짜 로그인
                    const loginUser: User = { id: 1, email: email };
                    set({ user: loginUser }, false, "USER / login action");
                }, 1000)
            },
            logout: () => {
                // 로그아웃 시 상태를 업데이트하여 사용자를 null로 설정합니다.
                set({ user: null }, false, "USER / logout action");
            },

        })
    )
);
