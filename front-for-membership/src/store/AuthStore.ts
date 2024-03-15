// src/store/AuthStore.ts
import { ITypeForLoginUser } from "@/types/typeForUser";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
    loginUser: ITypeForLoginUser | null;
    login: (loginUser: ITypeForLoginUser) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        loginUser: null,
        login: (loginUser) => set(() => ({ loginUser })),
        logout: () => {
            set(() => ({ loginUser: null }));
            localStorage.removeItem("accessToken");
        },
    }))
);

export default useAuthStore;
