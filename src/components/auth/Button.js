import styled from "styled-components";

const SButton = styled.button`
  all: unset;
  width: 100%;
  margin: 20px 0 10px 0;
  background-color: salmon;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  opacity: ${(props) => props.opacity};
  cursor: pointer;
`;

export const Button = ({ text, opacity }) => {
  return <SButton opacity={opacity}>{text}</SButton>;
};
