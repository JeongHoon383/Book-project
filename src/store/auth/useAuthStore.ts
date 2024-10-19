import { auth, db } from "@/firebase";
import { User } from "@/lib/auth/types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthStore } from "./types";
import { doc, getDoc } from "firebase/firestore";

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  registerStatus: "idle",
  registerError: null,

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();

            set({
              user: {
                id: currentUser.uid,
                email: currentUser.email ?? "",
                displayName: currentUser.displayName ?? "",
                isSeller: userData?.isSeller ?? false, // 기본값 설정, 실제 값은 별도로 가져와야 함
                createdAt: currentUser.metadata.creationTime
                  ? new Date(currentUser.metadata.creationTime)
                  : new Date(),
                updatedAt: currentUser.metadata.lastSignInTime
                  ? new Date(currentUser.metadata.lastSignInTime)
                  : new Date(),
              },
              isLogin: true,
            });
          } else {
            set({
              user: null,
              isLogin: false,
            });
            console.error("유저 정보를 가져올 수 없습니다.");
          }
        });
      } catch (error) {
        console.error("유저 정보를 가져오는 중 에러가 발생했습니다.", error);
        set({ user: null, isLogin: false });
      }
    }
  },

  logout: () => {
    Cookies.remove("accessToken");
    set({
      isLogin: false,
      user: null,
    });
  },

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  setUser: (user: User) => {
    set({ user, isLogin: true });
  },
}));
