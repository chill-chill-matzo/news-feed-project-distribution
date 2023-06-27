import React from 'react';
import { styled } from 'styled-components';

function Input() {
  return <TextInput></TextInput>;
}

export default Input;

const TextInput = styled.input`
  width: 200px;
  padding: 7px 10px;
  border: 1.5px solid var(--color_gray2);
  border-radius: 12px;
  margin: 10px;
`;
