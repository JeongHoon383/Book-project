import { auth, db } from "@/firebase";
import { User } from "@/lib/auth/types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthStore } from "./types";
import { doc, getDoc } from "firebase/firestore";
import { setItem, getItem } from "@/helpers/localStroage";

// initializeAuthStore 함수 타입 정의
export const initializeAuthStore: () => void = () => {
  const storedUser = getItem("user");
  if (storedUser) {
    const user: User = JSON.parse(storedUser);
    useAuthStore.getState().setUser(user);
  }
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  isLoading: false,

  setUser: (user: User) => {
    set({ user, isLogin: true, isLoading: false });
  },

  updateUser: (user: User) => {
    set({ user, isLogin: true, isLoading: false });
    setItem("user", user); // 필요한 경우에만 로컬 스토리지 업데이트
  },

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  logout: () => {
    Cookies.remove("accessToken");
    setItem("user", null); // localStorage에서 사용자 정보 제거
    set({
      isLogin: false,
      user: null,
      isLoading: false,
    });
  },

  // 로그인 상태 확인
  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");

    if (token) {
      // Firebase에서 인증 상태 확인
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            // Firestore에서 유저 정보 가져오기
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const user: User = {
                id: currentUser.uid,
                email: currentUser.email ?? "",
                displayName: currentUser.displayName ?? "",
                isSeller: userData?.isSeller ?? false,
                createdAt: currentUser.metadata.creationTime
                  ? new Date(currentUser.metadata.creationTime)
                  : new Date(),
                updatedAt: currentUser.metadata.lastSignInTime
                  ? new Date(currentUser.metadata.lastSignInTime)
                  : new Date(),
              };

              // Firebase에서 가져온 정보를 로컬 스토리지에 저장
              set({ user, isLogin: true, isLoading: false });
              setItem("user", user); // user 값을 로컬 스토리지에 저장
            }
          } catch (error) {
            console.error("유저 정보를 가져오는 중 에러 발생:", error);
            set({ user: null, isLogin: false, isLoading: false });
          }
        } else {
          set({ user: null, isLogin: false, isLoading: false }); // 유저 정보 없을 때
        }
      });
    } else {
      set({ user: null, isLogin: false, isLoading: false }); // 토큰이 없을 때 로딩 false로 설정
    }
  },
}));
