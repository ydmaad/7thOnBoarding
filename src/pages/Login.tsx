import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../queries/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // pages/LoginPage.tsx의 handleSubmit 수정
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        alert("로그인 성공!");
        navigate("/todos"); // '/mypage' 대신 '/todos'로 변경
      },
      onError: (error) => {
        alert("로그인에 실패했습니다.");
        console.error(error);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block mb-1">
            아이디
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          계정이 없으신가요?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
