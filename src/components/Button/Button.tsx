import React, {FC, ReactNode} from 'react';
import './Button.scss';

interface ButtonProps {
  children?: ReactNode;
  type: 'button' | 'reset' | 'submit';
  handleOnClick?: () => void;
  displayType: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({children, type, displayType, handleOnClick}) => {
  const className = `button button--${displayType}`;
  return (
    <button type={type} onClick={handleOnClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
