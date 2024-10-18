import { User } from "@/lib/auth/types";

export interface AuthStore {
  isLogin: boolean;
  user: User | null;
  checkLoginStatus: () => Promise<void>;
  logout: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User) => void;
}
