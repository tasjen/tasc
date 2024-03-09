import { format } from 'date-fns';
import { createContext, useContext, useRef, useState } from 'react';
import { UseInputReturnType, useInput } from '../hooks';
import { TTask } from '../types';

type InputAttributes = UseInputReturnType[0];

type TaskFormContextType = {
  nameInput: InputAttributes;
  nameInputRef: React.RefObject<HTMLInputElement>;
  descriptionInput: InputAttributes;
  dueDateInput: InputAttributes;
  priorityInput: InputAttributes;
  isVisible: boolean;
  editingTask: TTask | null;
  show: () => void;
  hide: () => void;
  showEdit: (taskObject: TTask) => void;
};

const TaskFormContext = createContext<TaskFormContextType | null>(null);

export function useTaskFormContext() {
  const context = useContext(TaskFormContext);
  if (!context) {
    throw new Error(
      'useTaskFormContext must be used inside the TaskFormContextProvider',
    );
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export default function TaskFormContextProvider(props: Props) {
  const [nameInput, setNameInput] = useInput('text');
  const [descriptionInput, setDescriptionInput] = useInput('text');
  const [dueDateInput, setDueDateInput] = useInput('date');
  const [priorityInput, setPriorityInput] = useInput('radio');

  const [isVisible, setIsvisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TTask | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  function show() {
    setIsvisible(true);
    nameInputRef.current?.focus();
  }
  function hide() {
    setIsvisible(false);
    setNameInput('');
    setDescriptionInput('');
    setDueDateInput('');
    setPriorityInput('1');
    setEditingTask(null);
  }
  function showEdit(task: TTask) {
    setNameInput(task.name);
    setDescriptionInput(task.description);
    setDueDateInput(format(task.due_date, 'yyyy-MM-dd'));
    setPriorityInput(task.priority.toString());
    setEditingTask(task);
    setIsvisible(true);
    nameInputRef.current?.focus();
  }

  return (
    <TaskFormContext.Provider
      value={{
        nameInput,
        nameInputRef,
        descriptionInput,
        dueDateInput,
        priorityInput,
        isVisible,
        editingTask,
        show,
        hide,
        showEdit,
      }}
    >
      {props.children}
    </TaskFormContext.Provider>
  );
}
