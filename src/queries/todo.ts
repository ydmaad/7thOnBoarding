// queries/todo.ts
import { useQuery } from "@tanstack/react-query";
import { todoAPI } from "../api/todo";
import { queryKeys } from "./queryKeys";

export const useTodos = () => {
  return useQuery({
    queryKey: queryKeys.todos.all,
    queryFn: () => todoAPI.getAll().then((res) => res.data),
  });
};

export const useTodo = (id: number) => {
  return useQuery({
    queryKey: queryKeys.todos.detail(id),
    queryFn: () => todoAPI.getById(id).then((res) => res.data),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
};
