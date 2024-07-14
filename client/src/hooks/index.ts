import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import userService from '../services/user';
import projectService from '../services/project';
import taskService from '../services/task';
import { useNotificationContext } from '../context/NotificationContext';
import { TUserData } from '../types';

export function useLocalStorage<T>(key: string) {
  function getItem(): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  function setItem(value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function removeItem(): void {
    localStorage.removeItem(key);
  }

  return { getItem, setItem, removeItem };
}

export type UseInputReturnType = [
  {
    type: string;
    value: string;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
  },
  setValue: React.Dispatch<React.SetStateAction<string>>,
];

export function useInput(type: HTMLInputTypeAttribute): UseInputReturnType {
  const [value, setValue] = useState('');

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValue(event.target.value);
  }

  return [{ type, value, onChange }, setValue];
}

export function useUserDataQuery(options = {}) {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: userService.getUserData,
    ...options,
  });

  return { userData, isLoading, isError, error };
}

export function useProjectMutation() {
  const queryClient = useQueryClient();
  const { showNoti } = useNotificationContext();

  const { mutateAsync: addProject } = useMutation({
    mutationFn: projectService.create,
    onSuccess: (returnedProject) => {
      const userData: TUserData | undefined = queryClient.getQueryData([
        'userData',
      ]);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: [...userData.projects, { ...returnedProject, tasks: [] }],
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: updateProject } = useMutation({
    mutationFn: projectService.update,
    onSuccess: (updatedProject) => {
      const userData: TUserData | undefined = queryClient.getQueryData([
        'userData',
      ]);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) =>
            p.id !== updatedProject.id
              ? p
              : { ...p, name: updatedProject.name },
          ),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: removeProject } = useMutation({
    mutationFn: projectService.remove,
    onSuccess: (projectId) => {
      const userData: TUserData | undefined = queryClient.getQueryData([
        'userData',
      ]);
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
}

export function useTaskMutation() {
  const queryClient = useQueryClient();
  const { showNoti } = useNotificationContext();

  const { mutateAsync: addTask } = useMutation({
    mutationFn: taskService.create,
    onSuccess: ({ project: projectId, ...task }) => {
      const userData: TUserData | undefined = queryClient.getQueryData([
        'userData',
      ]);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) =>
            p.id !== projectId ? p : { ...p, tasks: [...p.tasks, task] },
          ),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: taskService.update,
    onSuccess: ({ project: projectId, ...task }) => {
      const userData: TUserData | undefined = queryClient.getQueryData([
        'userData',
      ]);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) =>
            p.id !== projectId
              ? p
              : {
                  ...p,
                  tasks: p.tasks.map((t) => (t.id !== task.id ? t : task)),
                },
          ),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  const { mutateAsync: removeTask } = useMutation({
    mutationFn: taskService.remove,
    onSuccess: (taskId) => {
      const userData: TUserData | undefined = queryClient.getQueryData([
        'userData',
      ]);
      if (userData) {
        queryClient.setQueryData(['userData'], {
          ...userData,
          projects: userData.projects.map((p) => ({
            ...p,
            tasks: p.tasks.filter((t) => t.id !== taskId),
          })),
        });
      }
    },
    onError: (err: unknown) => showNoti(err),
  });

  return { addTask, updateTask, removeTask };
}
