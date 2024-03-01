import { createContext, useState } from 'react';

type ProjectFormContextType = {
  nameInput: string;
  isVisible: boolean;
  updatingProjectId: string | null;
  show: () => void;
  hide: () => void;
  setNameInput: (value: string) => void;
  setUpdatingProjectId: (id: string | null) => void;
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

  const show = () => {
    setIsvisible(true);
  };
  const hide = () => {
    setIsvisible(false);
    setUpdatingProjectId(null);
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
        setUpdatingProjectId,
      }}
    >
      {props.children}
    </ProjectFormContext.Provider>
  );
};

export default ProjectFormContext;
