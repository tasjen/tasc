import React from 'react';
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

  const turnOffVisible = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return { turnOffVisible };
  });

  const childWithTurnOffVisible = React.Children.map(props.children, (c) => {
    return React.cloneElement(c, { turnOffVisible });
  });

  return (
    <>
      <button style={hideWhenVisible} onClick={toggleVisible}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>{childWithTurnOffVisible}</div>
    </>
  );
});

export default Togglable;
