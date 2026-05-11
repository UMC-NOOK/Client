import { useNavigate } from "react-router-dom";
import { devLogin } from "../../api/auth";

export default function DevLoginButton() {
  const navigate = useNavigate();

  const handleDevLogin = async () => {
    try {
      await devLogin({
        email: "dev@test.com",
        nickName: "DEV_USER",
      });
      alert("DEV 로그인 완료");
    } catch (error) {
      console.error("DEV 로그인 실패:", error);
      alert("DEV 로그인 실패");
    }
  };

  const handleDevAdminLogin = async () => {
    try {
      await devLogin({
        email: "admin@test.com",
        nickName: "DEV_ADMIN",
      });
      alert("DEV_ADMIN 로그인 완료");
    } catch (error) {
      console.error("DEV_ADMIN 로그인 실패:", error);
      alert("DEV_ADMIN 로그인 실패");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 완료");
    navigate("/login", { replace: true });
  };

  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2">
      <button
        type="button"
        onClick={handleDevLogin}
        className="rounded-md bg-gray-17 px-3 py-2 text-sm text-gray-90 shadow-md"
      >
        DEV 로그인
      </button>

      <button
        type="button"
        onClick={handleDevAdminLogin}
        className="rounded-md bg-gray-17 px-3 py-2 text-sm text-gray-90 shadow-md"
      >
        ADMIN 로그인
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-md bg-gray-17 px-3 py-2 text-sm text-gray-90 shadow-md"
      >
        로그아웃
      </button>
    </div>
  );
}