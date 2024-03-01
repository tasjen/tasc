import { useState, createContext } from 'react';

type VisibleContextType = {
  show: () => void;
  hide: () => void;
};

const VisibleContext = createContext<VisibleContextType | null>(null);

type Props = {
  buttonLabel: string;
  children: JSX.Element;
};

const Togglable = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible ? (
        <div>
          <VisibleContext.Provider value={{ show, hide }}>
            {props.children}
          </VisibleContext.Provider>
        </div>
      ) : (
        <button onClick={show}>{props.buttonLabel}</button>
      )}
      <div>{props.children}</div>
    </div>
  );
};

export default Togglable;
