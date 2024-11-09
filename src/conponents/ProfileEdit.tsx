// components/ProfileEdit.tsx
import { useState, useRef } from "react";
import { authAPI } from "../api/auth";

interface ProfileEditProps {
  currentNickname: string;
  currentAvatar: string | null;
  onUpdate: () => void; // 업데이트 후 부모 컴포넌트 리프레시
  onCancel: () => void;
}

const ProfileEdit = ({
  currentNickname,
  currentAvatar,
  onUpdate,
  onCancel,
}: ProfileEditProps) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentAvatar
  );
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      // 닉네임이 변경된 경우에만 추가
      if (nickname !== currentNickname) {
        formData.append("nickname", nickname);
      }

      // 파일이 선택된 경우에만 추가
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.append("avatar", file);
      }

      await authAPI.updateProfile(formData);
      alert("프로필이 업데이트되었습니다.");
      onUpdate(); // 부모 컴포넌트 갱신
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">프로필 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            프로필 이미지
          </label>
          <div className="flex items-center space-x-4">
            {/* 현재 프로필 이미지 또는 미리보기 */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="프로필 미리보기"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              이미지 선택
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="nickname" className="block text-sm font-medium mb-2">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "업데이트 중..." : "저장"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
