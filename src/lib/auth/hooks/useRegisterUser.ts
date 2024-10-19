// useRegisterUser.ts
import { useMutation } from "@tanstack/react-query";
import { registerUserAPI } from "../api";
import { User, RegisterUserReqDTO, LoginRequestDto } from "../types";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/store/toast/useToastStore";
import { pageRoutes } from "@/apiRoutes";

export const useRegisterUser = () => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  return useMutation<User, Error, RegisterUserReqDTO, LoginRequestDto>({
    mutationFn: registerUserAPI,
    onSuccess: () => {
      addToast("회원가입 성공!", "success");
      navigate(pageRoutes.login);
    },
    onError: (error: Error) => {
      addToast("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.", "error");
      console.error("회원가입 중 오류가 발생했습니다.", error.message);
    },
  });
};

// 토스트 추가해야됨
