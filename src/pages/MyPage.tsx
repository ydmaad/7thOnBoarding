// pages/MyPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/auth";
import ProfileEdit from "../conponents/ProfileEdit";
import { UserInfo } from "../types/auth";

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await authAPI.getUserInfo();
      setUserInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">마이 페이지</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/todos")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            투두리스트
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 사용자 정보 표시 */}
      {!isEditing ? (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div>
              <p className="text-xl font-semibold">{userInfo.nickname}</p>
              <p className="text-gray-600">{userInfo.id}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            프로필 수정
          </button>
        </div>
      ) : (
        <ProfileEdit
          currentNickname={userInfo.nickname}
          currentAvatar={userInfo.avatar}
          onUpdate={() => {
            fetchUserInfo();
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default MyPage;
