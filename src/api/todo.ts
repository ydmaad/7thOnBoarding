import { Todo } from "../types/todo";
import { axiosInstance } from "./instance";

export const todoAPI = {
  getAll: () => axiosInstance.get<Todo[]>("/todos"),

  getById: (id: number) => axiosInstance.get<Todo>(`/todos/${id}`),
};
