import React from "react";
import { useAppSelector } from "../redux/hooks";
import { css, keyframes } from "@emotion/react";

const spinAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loaderContainer = css`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.834);
  z-index: 1;
`;

const spinner = css`
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #3d5af1 transparent #3d5af1 transparent;
  border-radius: 50%;
  animation: ${spinAnim} 1.2s linear infinite;
`;

export const Loading: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  if (!isLoading) return null;
  return (
    <div>
      <div css={loaderContainer}>
        <div css={spinner} />
      </div>
    </div>
  );
};
