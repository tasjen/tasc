import { createContext, useContext, useState } from 'react';
import { ProjectState } from '../types';
import { useInput } from '../hooks';

type InputAttributes = ReturnType<typeof useInput>[0];

type ProjectFormContextType = {
  nameInput: InputAttributes;
  isVisible: boolean;
  editingProjectId: string | null;
  show: () => void;
  hide: () => void;
  showEdit: (project: ProjectState) => void;
};

const ProjectFormContext = createContext<ProjectFormContextType | null>(null);

export function useProjectFormContext() {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error(
      'useProjectFormContext must be used inside the ProjectFormContextProvider',
    );
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export default function ProjectFormContextProvider(props: Props) {
  const [nameInput, setNameInput] = useInput('text');
  const [isVisible, setIsvisible] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  function show() {
    setIsvisible(true);
  }
  function hide() {
    setIsvisible(false);
    setEditingProjectId(null);
    setNameInput('');
  }

  function showEdit(project: ProjectState) {
    setNameInput(project.name);
    setEditingProjectId(project.id);
    setIsvisible(true);
  }

  return (
    <ProjectFormContext.Provider
      value={{
        nameInput,
        isVisible,
        editingProjectId,
        show,
        hide,
        showEdit,
      }}
    >
      {props.children}
    </ProjectFormContext.Provider>
  );
}
