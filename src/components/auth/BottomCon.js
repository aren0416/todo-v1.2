import { Link } from "react-router-dom";
import styled from "styled-components";

const SBottomCon = styled.span`
  margin-top: 30px;
  a {
    color: cornflowerblue;
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const BottomCon = ({ text, link, linkText }) => {
  return (
    <SBottomCon>
      {text} <Link to={link}> {linkText}</Link>
    </SBottomCon>
  );
};
