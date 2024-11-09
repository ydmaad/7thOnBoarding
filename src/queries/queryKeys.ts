export const queryKeys = {
  todos: {
    all: ["todos"] as const,
    detail: (id: number) => ["todos", id] as const,
  },
} as const;
