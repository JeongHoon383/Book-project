import { pageRoutes } from "@/apiRoutes";
import { loginAPI } from "./../api";
import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { useNavigate } from "react-router-dom";
import { LoginRequestDto, LoginResponseDto, User } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: loginAPI,
    onSuccess: (userData) => {
      addToast("로그인 성공!", "success");
      setIsLogin(true);
      const user: User = {
        id: userData.uid,
        email: userData.email,
        displayName: userData.displayName || "",
        isSeller: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(user);
      navigate(pageRoutes.main);
    },
    onError: (error: Error) => {
      addToast(
        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
        "error"
      );
      console.error(
        "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.",
        error
      );
    },
  });
};
