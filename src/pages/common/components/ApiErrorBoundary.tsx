import { Button } from "@/components/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useLocation } from "react-router-dom";

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
        <Button variant="default" onClick={resetErrorBoundary}>
          다시시도
          <RefreshCcw className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  } else {
    throw error;
  }

  return null;
};

interface ApiErrorBoundaryProps {
  children: ReactNode;
}

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
