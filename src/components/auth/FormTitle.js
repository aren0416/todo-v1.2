import styled from "styled-components";

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
`;
export const FormTitle = ({ title }) => {
  return <Title>{title}</Title>;
};
