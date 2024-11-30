import { auth, db } from "@/firebase";
import { User } from "@/lib/auth/types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthStore } from "./types";
import { doc, getDoc } from "firebase/firestore";
import { setItem, getItem } from "@/helpers/localStroage";

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
    setItem("user", user);
  },

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  logout: () => {
    Cookies.remove("accessToken");
    setItem("user", null);
    set({
      isLogin: false,
      user: null,
      isLoading: false,
    });
  },

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");

    if (token) {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
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

              set({ user, isLogin: true, isLoading: false });
              setItem("user", user);
            }
          } catch (error) {
            console.error("유저 정보를 가져오는 중 에러 발생:", error);
            set({ user: null, isLogin: false, isLoading: false });
          }
        } else {
          set({ user: null, isLogin: false, isLoading: false });
        }
      });
    } else {
      set({ user: null, isLogin: false, isLoading: false });
    }
  },
}));
