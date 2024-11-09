// pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../queries/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const { mutate: register, isPending, error } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData, {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      },
      onError: (error: any) => {
        // 타입 수정 필요
        console.log("Error details:", error); // 자세한 에러 내용 확인
        alert(`회원가입 실패: ${error.message}`);
      },
    });
  };

  // 에러 메시지 표시
  if (error) {
    console.log("Error state:", error); // 에러 상태 확인
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>
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
        <div>
          <label htmlFor="nickname" className="block mb-1">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
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
          {isPending ? "처리중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
