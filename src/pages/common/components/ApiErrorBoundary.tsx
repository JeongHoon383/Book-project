import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import { Button } from "./Button";

interface ApiErrorFallbackProps extends FallbackProps {
  additionalProp?: string;
}

export const ApiErrorFallback: React.FC<ApiErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  if (error instanceof Error) {
    if (error.name === "FetchError") {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="md:text-5xl text-2xl font-bold mb-5">
            서비스에 접속할 수 없습니다.
          </h1>
          <p className="mb-10 md:text-base text-xs">
            새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.
          </p>
          <Button text="새로고침" onClick={resetErrorBoundary} />
        </div>
      );
    }
  }

  return null;
};

interface ApiErrorBoundaryProps {
  children: ReactNode;
}

// React-Query와 연동하여 에러 처리, 아래 함수로 자식 컴포넌트를 감싸 에러 처리
export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({
  children,
}) => {
  const { reset } = useQueryErrorResetBoundary();
  const key = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ApiErrorFallback}
      onReset={reset}
      resetKeys={[key]}
    >
      {children}
    </ErrorBoundary>
  );
};
