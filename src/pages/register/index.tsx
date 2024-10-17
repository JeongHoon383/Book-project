import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };
  return (
    <div className="min-h-[80%] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>회원가입</CardTitle>
            <CardDescription>새 계정을 만들어주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "이메일은 필수입니다",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "올바른 이메일 형식이 아닙니다",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nickname">닉네임</Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="닉네임"
                    {...register("nickname", {
                      required: "닉네임은 필수입니다",
                      minLength: {
                        value: 2,
                        message: "닉네임은 2자 이상이어야 합니다",
                      },
                    })}
                  />
                  {errors.nickname && (
                    <p className="text-sm text-red-500">
                      {errors.nickname.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register("password", {
                      required: "비밀번호는 필수입니다",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 8자 이상이어야 합니다",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
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
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="isSeller" {...register("isSeller")} />
                  <Label htmlFor="isSeller">판매자로 가입</Label>
                </div>
              </div>

              <Button className="w-full mt-6" type="submit">
                가입하기
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center text-gray-600">
              이미 계정이 있으신가요?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                로그인
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
