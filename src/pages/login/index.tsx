import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/lib/auth/hooks/useLogin";
import { pageRoutes } from "@/apiRoutes";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

// layout 렌더링 안됨
// zustand에서 값을 못 불러오는 것 같음 - 아님

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
    navigate(pageRoutes.main);
  };

  return (
    <div className="min-h-[70%] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
          로그인
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4AAF70] focus:border-[#4AAF70] sm:text-sm"
                  {...register("password", {
                    required: "비밀번호는 필수입니다",
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  className="h-4 w-4 text-[#4AAF70] focus:ring-[#4AAF70] border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <Label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  로그인 상태 유지
                </Label>
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-[#4AAF70] hover:text-[#3D9460]"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4AAF70] hover:bg-[#3D9460] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4AAF70]"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <Link
                  to={pageRoutes.register}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
