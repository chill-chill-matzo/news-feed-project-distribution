import React from 'react';
import { styled } from 'styled-components';

export function BlueButton({ children, ...props }) {
  return <Blue {...props}>{children}</Blue>;
}

export function GrayButton({ children, ...props }) {
  return <Gray {...props}>{children}</Gray>;
}

export function TextButton({ children, ...props }) {
  return <Text {...props}>{children}</Text>;
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

const Text = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: var(--color_gray1);
  cursor: pointer;
`;
