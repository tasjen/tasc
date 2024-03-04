import { format } from 'date-fns';
import { createContext, useRef, useState } from 'react';

type TaskObject = {
  name: string;
  description: string;
  due_date: string;
  priority: 1 | 2 | 3;
  id: string;
};

type TaskFormContextType = {
  nameInput: TaskObject['name'];
  descriptionInput: TaskObject['description'];
  dueDateInput: TaskObject['due_date'];
  priorityInput: TaskObject['priority'];
  isVisible: boolean;
  updatingTaskId: string | null;
  show: () => void;
  hide: () => void;
  setNameInput: (value: string) => void;
  setDescriptionInput: (value: string) => void;
  setDueDateInput: (value: string) => void;
  setPriorityInput: (value: TaskObject['priority']) => void;
  showEdit: (taskObject: TaskObject) => void;
  nameInputRef: React.RefObject<HTMLInputElement>;
};

const TaskFormContext = createContext<TaskFormContextType>(
  {} as TaskFormContextType,
);

type Props = {
  children: React.ReactNode;
};

export function TaskFormContextProvider(props: Props) {
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [priorityInput, setPriorityInput] = useState<TaskObject['priority']>(1);

  const [isVisible, setIsvisible] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const nameInputRef = useRef(null);

  function show() {
    setIsvisible(true);
  }
  function hide() {
    setIsvisible(false);
    setNameInput('');
    setDescriptionInput('');
    setDueDateInput('');
    setPriorityInput(1);
    setUpdatingTaskId(null);
  }
  function showEdit(task: TaskObject) {
    setNameInput(task.name);
    setDescriptionInput(task.description);
    setDueDateInput(format(task.due_date, 'yyyy-MM-dd'));
    setPriorityInput(task.priority);
    setUpdatingTaskId(task.id);
    setIsvisible(true);
  }

  return (
    <TaskFormContext.Provider
      value={{
        nameInput,
        descriptionInput,
        dueDateInput,
        priorityInput,
        isVisible,
        updatingTaskId,
        show,
        hide,
        setNameInput,
        setDescriptionInput,
        setDueDateInput,
        setPriorityInput,
        showEdit,
        nameInputRef,
      }}
    >
      {props.children}
    </TaskFormContext.Provider>
  );
}

export default TaskFormContext;
