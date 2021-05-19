import React from 'react';
import classNames from 'classnames';

const Button = ({
  label,
  className,
  bg = 'white',
  border = 'none',
  icon,
  iconClassName,
  handleClick
}) => {
  return (
    <button
      className={classNames([
        className,
        'button',
        `button-${bg}`,
        `button-border-${border}`,
      ])}
      onClick={handleClick}
    >
      {label}
      {icon && <img src={icon} className={iconClassName} alt="arrow" />}
    </button>
  );
};

export default Button;
