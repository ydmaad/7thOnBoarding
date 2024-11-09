// src/routes/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoDetail from "../pages/TodoDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import TodoList from "../pages/TodoList";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
