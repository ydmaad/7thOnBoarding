// pages/TodoListPage.tsx
import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { authAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/auth";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await authAPI.getUserInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">할 일 목록</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/mypage")} // 마이페이지 버튼 추가
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            마이페이지
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

      {/* Todo 입력 폼 */}
      <form
        className="mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTodo.trim()) return;

          setTodos([
            ...todos,
            { id: Date.now(), title: newTodo, completed: false },
          ]);
          setNewTodo("");
        }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 할 일을 입력하세요"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            추가
          </button>
        </div>
      </form>

      {/* Todo 목록 */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  );
                }}
                className="w-4 h-4"
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => {
                setTodos(todos.filter((t) => t.id !== todo.id));
              }}
              className="px-2 py-1 text-sm text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
