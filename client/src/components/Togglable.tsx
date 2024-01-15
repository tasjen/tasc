import { useState, forwardRef, useImperativeHandle } from 'react';

type Props = {
  buttonLabel: string;
  children: JSX.Element;
};

const Togglable = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const turnOnVisible = () => {
    setVisible(true);
  };

  const turnOffVisible = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return { turnOnVisible, turnOffVisible };
  });

  return (
    <>
      <button style={hideWhenVisible} onClick={toggleVisible}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>{props.children}</div>
    </>
  );
});

export default Togglable;
