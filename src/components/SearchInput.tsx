import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border-radius: 10px;
  border: 2px solid #808080;
`;

interface Props {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput = ({ type, value, onChange, placeholder }: Props) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
