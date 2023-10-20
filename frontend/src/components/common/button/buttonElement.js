import styled, { css } from "styled-components";

export const MainButton = styled.button`
  :disabled {
    cursor: not-allowed;
    background: gray !important;
  }

  position: relative;
  overflow: hidden;

  background: ${(p) =>
    p.theme.button.primaryBtn && p.primary && p.theme.button.primaryBtn};
  ${(p) =>
    p.primary &&
    css`
      padding: 0.5rem 2rem;
      border: none;
      font-weight: bold;
      border-radius: 0px;
    `}

  ${(p) =>
    p.buttonCenter &&
    css`
      display: flex;
      margin-left: auto;
      margin-right: auto;
    `} 


    ${(p) =>
    p.connectWallet &&
    css`
      padding: 0.5rem 2rem;
      color: ${(p) => p.theme.button.connectBtnText};
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-weight: bold;
      border: 3px solid #ffee00;
      background: transparent;
    `}
`;

export const ButtonIcon = styled.img`
  margin-top: -0.3rem;
  margin-right: 0.3rem;
`;
