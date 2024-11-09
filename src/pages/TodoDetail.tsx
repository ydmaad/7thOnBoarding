// src/pages/TodoDetailPage.tsx
import { useTodo } from "../queries/todo";
import { useParams, Link } from "react-router-dom";

const TodoDetail = () => {
  const { id } = useParams();
  const { data: todo, isLoading, error } = useTodo(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h1>Todo Detail</h1>
      <div>
        <h2>{todo?.title}</h2>
        <p>Status: {todo?.completed ? "완료" : "미완료"}</p>
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
};

export default TodoDetail;
