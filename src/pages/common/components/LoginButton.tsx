import { pageRoutes } from "@/apiRoutes";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 로그인 페이지를 들어오기 직전의 경로를 저장

  const handleClickLogin = () => {
    navigate(pageRoutes.login, { state: { prevPath: location.pathname } });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary-dark"
      onClick={handleClickLogin}
    >
      로그인
    </Button>
  );
};
