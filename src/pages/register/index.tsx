import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useRegisterUser } from "@/lib/auth/hooks/useRegisterUser";
import { pageRoutes } from "@/apiRoutes";

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
}

export const Register: React.FC = () => {
  const { mutate: registerUser, isPending: isLoading } = useRegisterUser();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      isSeller: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    registerUser({
      email: data.email,
      password: data.password,
      name: data.nickname,
      isSeller: data.isSeller,
    });
  };
  return (
    <div className="min-h-[70%] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-borderGray sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4AAF70] focus:border-[#4AAF70] sm:text-sm"
                  {...register("email", {
                    required: "이메일은 필수입니다",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "올바른 이메일 형식이 아닙니다",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </Label>
              <div className="mt-1">
                <Input
                  id="nickname"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4AAF70] focus:border-[#4AAF70] sm:text-sm"
                  {...register("nickname", {
                    required: "닉네임은 필수입니다",
                    minLength: {
                      value: 2,
                      message: "닉네임은 2자 이상이어야 합니다",
                    },
                  })}
                />
                {errors.nickname && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.nickname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4AAF70] focus:border-[#4AAF70] sm:text-sm"
                  {...register("password", {
                    required: "비밀번호는 필수입니다",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자 이상이어야 합니다",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </Label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4AAF70] focus:border-[#4AAF70] sm:text-sm"
                  {...register("confirmPassword", {
                    required: "비밀번호 확인은 필수입니다",
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "비밀번호가 일치하지 않습니다";
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="isSeller"
                className="h-4 w-4 text-[#4AAF70] focus:ring-[#4AAF70] border-gray-300 rounded"
                {...register("isSeller")}
                onCheckedChange={(checked) =>
                  setValue("isSeller", Boolean(checked), {
                    shouldValidate: true,
                  })
                }
              />
              <Label
                htmlFor="isSeller"
                className="ml-2 block text-sm text-gray-900"
              >
                판매자로 가입
              </Label>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4AAF70] hover:bg-[#3D9460] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4AAF70]"
                disabled={isLoading}
              >
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
            </div>
            <div className="flex justify-center">
              <span className="text-sm">이미 아이디가 있으신가요?</span>
              <Link
                to={pageRoutes.login}
                className="text-sm ml-4 text-[#4AAF70] hover:text-[#3D9460]"
              >
                로그인
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
