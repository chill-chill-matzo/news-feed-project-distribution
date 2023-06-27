import React from 'react';
import { styled } from 'styled-components';

export function Input() {
  return <TextInput></TextInput>;
}

export function TitleInput({ children }) {
  return <Title placeholder="제목을 입력하세요">{children}</Title>;
}

export function ContentInput({ children }) {
  return <Content placeholder="내용을 입력하세요">{children}</Content>;
}

const TextInput = styled.input`
  width: 200px;
  padding: 7px 10px;
  border: 1.5px solid var(--color_gray2);
  border-radius: 12px;
  margin: 10px;
`;

const Title = styled.input`
  width: 80%;
  padding: 13px 10px;
  margin: 10px;
  border: 1.5px solid var(--color_gray2);
  border-radius: 12px;
  font-weight: 600;
`;

const Content = styled.textarea`
  width: 80%;
  height: 300px;
  padding: 7px 10px;
  margin: 10px;
  border: 1.5px solid var(--color_gray2);
  border-radius: 12px;
  font-size: 17px;
  resize: none;
`;
