import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, HTMLInputTypeAttribute, useContext, useRef, useState } from "react";
import userService from '../services/user';
import projectService from '../services/project'
import taskService from '../services/task'
import NotificationContext from "../context/NotificationContext";
import { UserState } from "../types";

export function useLocalStorage<T>(key: string) {
  function getItem(): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  function setItem(value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  };

  function removeItem(): void {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};

export function useInput(type: HTMLInputTypeAttribute): [
  {
    type: string,
    value: string,
    ref: React.RefObject<HTMLInputElement>,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  },
  setValue: React.Dispatch<React.SetStateAction<string>>
] {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  };

  return [{ type, value, ref, onChange }, setValue];
};

export function useUserDataQuery(options = {}) {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: () => {
      console.log('fetch userData');
      return userService.getUserData();
    },
    ...options
  });

  return { userData, isLoading, isError, error };
};

export function useProjectMutation() {
  const queryClient = useQueryClient();
  const { showNoti } = useContext(NotificationContext);

  const { mutateAsync: addProject } = useMutation({
    mutationFn: projectService.create,
    onSuccess: (returnedProject) => {
      const userData: UserState | undefined = queryClient.getQueryData(['userData']);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: [...userData.projects, returnedProject],
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: updateProject } = useMutation({
    mutationFn: projectService.update,
    onSuccess: (updatedProject) => {
      const userData: UserState | undefined = queryClient.getQueryData(['userData']);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) =>
            p.id !== updatedProject.id ? p : { ...p, name: updatedProject.name },
          ),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: removeProject } = useMutation({
    mutationFn: projectService.remove,
    onSuccess: (projectId) => {
      const userData: UserState | undefined = queryClient.getQueryData(['userData']);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.filter((e) => e.id !== projectId),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });


  return { addProject, updateProject, removeProject };
};

export function useTaskMutation() {
  const queryClient = useQueryClient();
  const { showNoti } = useContext(NotificationContext);

  const { mutateAsync: addTask } = useMutation({
    mutationFn: taskService.create,
    onSuccess: ({ project: projectId, ...task }) => {
      const userData: UserState | undefined = queryClient.getQueryData(['userData']);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) => p.id !== projectId ? p : { ...p, tasks: [...p.tasks, task] }
          ),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: taskService.update,
    onSuccess: ({ project: projectId, ...task }) => {
      const userData: UserState | undefined = queryClient.getQueryData(['userData']);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) =>
            p.id !== projectId ? p : { ...p, tasks: p.tasks.map(t => t.id !== task.id ? t : task) },
          ),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: removeTask } = useMutation({
    mutationFn: taskService.remove,
    onSuccess: (taskId) => {
      const userData: UserState | undefined = queryClient.getQueryData(['userData']);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) => ({ ...p, tasks: p.tasks.filter(t => t.id !== taskId) })),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  return { addTask, updateTask, removeTask }
}