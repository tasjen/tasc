import React, { createContext, useContext, useRef, useState } from 'react';
import { ProjectAPI } from '../types';
import { useInput } from '../hooks';

type InputAttributes = ReturnType<typeof useInput>[0];

type ProjectFormContextType = {
  nameInput: InputAttributes;
  nameInputRef: React.RefObject<HTMLInputElement>;
  isVisible: boolean;
  editingProject: ProjectAPI | null;
  show: () => void;
  hide: () => void;
  showEdit: (project: ProjectAPI) => void;
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
  const [editingProject, setEditingProject] = useState<ProjectAPI | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  function show() {
    setIsvisible(true);
    nameInputRef.current?.focus();
  }
  function hide() {
    setIsvisible(false);
    setEditingProject(null);
    setNameInput('');
  }

  function showEdit(project: ProjectAPI) {
    setNameInput(project.name);
    setEditingProject(project);
    setIsvisible(true);
    nameInputRef.current?.focus();
  }

  return (
    <ProjectFormContext.Provider
      value={{
        nameInput,
        nameInputRef,
        isVisible,
        editingProject,
        show,
        hide,
        showEdit,
      }}
    >
      {props.children}
    </ProjectFormContext.Provider>
  );
}
