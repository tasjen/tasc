import { createContext, useState } from 'react';
import { ProjectState } from '../types';
import { useInput } from '../hooks';

type ProjectFormContextType = {
  nameInput: ReturnType<typeof useInput>[0];
  isVisible: boolean;
  editingProjectId: string | null;
  show: () => void;
  hide: () => void;
  showEdit: (project: ProjectState) => void;
};

const ProjectFormContext = createContext<ProjectFormContextType>(
  {} as ProjectFormContextType,
);

type Props = {
  children: React.ReactNode;
};

export function ProjectFormContextProvider(props: Props) {
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

export default ProjectFormContext;
