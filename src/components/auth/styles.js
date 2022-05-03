import styled from "styled-components";

export const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrap = styled.div`
  width: 450px;
  padding: 50px;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  all: unset;
  width: 100%;
  border: 1px solid #dbdbdb;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
