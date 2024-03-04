import { createContext, useRef, useState } from 'react';
import { ProjectState } from '../types';

type ProjectFormContextType = {
  nameInput: string;
  isVisible: boolean;
  updatingProjectId: string | null;
  show: () => void;
  hide: () => void;
  setNameInput: (value: string) => void;
  showEdit: (project: ProjectState) => void;
  nameInputRef: React.RefObject<HTMLInputElement>;
};

const ProjectFormContext = createContext<ProjectFormContextType>(
  {} as ProjectFormContextType,
);

type Props = {
  children: React.ReactNode;
};

export const ProjectFormContextProvider = (props: Props) => {
  const [nameInput, setNameInput] = useState('');
  const [isVisible, setIsvisible] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(
    null,
  );

  const nameInputRef = useRef<HTMLInputElement>(null);

  const show = () => {
    setIsvisible(true);
  };
  const hide = () => {
    setIsvisible(false);
    setUpdatingProjectId(null);
    setNameInput('');
  };

  const showEdit = (project: ProjectState) => {
    setNameInput(project.name);
    setUpdatingProjectId(project.id);
    setIsvisible(true);
  };

  return (
    <ProjectFormContext.Provider
      value={{
        nameInput,
        isVisible,
        updatingProjectId,
        show,
        hide,
        setNameInput,
        showEdit,
        nameInputRef,
      }}
    >
      {props.children}
    </ProjectFormContext.Provider>
  );
};

export default ProjectFormContext;
