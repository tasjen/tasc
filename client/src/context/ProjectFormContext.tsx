import React, { createContext, useContext, useRef, useState } from 'react';
import { TProject } from '../types';
import { useInput } from '../hooks';

type InputAttributes = ReturnType<typeof useInput>[0];

type ProjectFormContextType = {
  nameInput: InputAttributes;
  nameInputRef: React.RefObject<HTMLInputElement>;
  isVisible: boolean;
  editingProjectId: string | null;
  show: () => void;
  hide: () => void;
  showEdit: (project: TProject) => void;
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

  const nameInputRef = useRef<HTMLInputElement>(null);

  function show() {
    setIsvisible(true);
    nameInputRef.current?.focus();
  }
  function hide() {
    setIsvisible(false);
    setEditingProjectId(null);
    setNameInput('');
  }

  function showEdit(project: TProject) {
    setNameInput(project.name);
    setEditingProjectId(project.id);
    setIsvisible(true);
    nameInputRef.current?.focus();
  }

  return (
    <ProjectFormContext.Provider
      value={{
        nameInput,
        nameInputRef,
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
