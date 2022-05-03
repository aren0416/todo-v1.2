import styled from "styled-components";

const SErrorMessage = styled.span`
  margin-bottom: 15px;
  color: tomato;
`;

export const ErrorMessage = ({ message }) => {
  return <SErrorMessage>{message}</SErrorMessage>;
};
