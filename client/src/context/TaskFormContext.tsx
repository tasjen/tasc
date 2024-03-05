import { format } from 'date-fns';
import { createContext, useState } from 'react';
import { useInput } from '../hooks';

type TaskObject = {
  name: string;
  description: string;
  due_date: string;
  priority: 1 | 2 | 3;
  id: string;
};

type TaskFormContextType = {
  nameInput: ReturnType<typeof useInput>[0];
  descriptionInput: ReturnType<typeof useInput>[0];
  dueDateInput: ReturnType<typeof useInput>[0];
  priorityInput: ReturnType<typeof useInput>[0];
  isVisible: boolean;
  editingTaskId: string | null;
  show: () => void;
  hide: () => void;
  showEdit: (taskObject: TaskObject) => void;
};

const TaskFormContext = createContext<TaskFormContextType>(
  {} as TaskFormContextType,
);

type Props = {
  children: React.ReactNode;
};

export function TaskFormContextProvider(props: Props) {
  const [nameInput, setNameInput] = useInput('text');
  const [descriptionInput, setDescriptionInput] = useInput('text');
  const [dueDateInput, setDueDateInput] = useInput('date');
  const [priorityInput, setPriorityInput] = useInput('radio');

  const [isVisible, setIsvisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  function show() {
    setIsvisible(true);
  }
  function hide() {
    setIsvisible(false);
    setNameInput('');
    setDescriptionInput('');
    setDueDateInput('');
    setPriorityInput('1');
    setEditingTaskId(null);
  }
  function showEdit(task: TaskObject) {
    setNameInput(task.name);
    setDescriptionInput(task.description);
    setDueDateInput(format(task.due_date, 'yyyy-MM-dd'));
    setPriorityInput(task.priority.toString());
    setEditingTaskId(task.id);
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
        editingTaskId,
        show,
        hide,
        showEdit,
      }}
    >
      {props.children}
    </TaskFormContext.Provider>
  );
}

export default TaskFormContext;
