import React from 'react';
import { styled } from 'styled-components';

export function BlueButton({ children }) {
  return <Blue>{children}</Blue>;
}

export function GrayButton({ children }) {
  return <Gray>{children}</Gray>;
}

const Blue = styled.button`
  align-items: center;
  margin: 5px;
  padding: 10px 15px;
  background-color: var(--color_blue2);
  color: var(--color_white1);
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color_blue1);
  }
`;

const Gray = styled.button`
  align-items: center;
  margin: 5px;
  padding: 10px 15px;
  background-color: var(--color_gray2);
  color: var(--color_white1);
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color_gray1);
  }
`;
