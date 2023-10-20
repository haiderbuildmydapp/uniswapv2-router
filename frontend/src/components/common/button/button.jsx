import React from "react";
import { MainButton, ButtonIcon } from "./buttonElement";
// framer Motion

const Button = ({
  children,
  primary,
  secondary,
  buttonCenter,
  buttonEnd,
  connectWallet,
  isDisabled,
  onClick,
}) => {
  return (
    <div>
      <MainButton
        primary={primary}
        secondary={secondary}
        buttonCenter={buttonCenter}
        buttonEnd={buttonEnd}
        connectWallet={connectWallet}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </MainButton>
    </div>
  );
};

export default Button;
