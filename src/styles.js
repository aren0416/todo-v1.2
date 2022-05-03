import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`
    ${reset}
    *{ box-sizing: border-box;}
    body {
        letter-spacing: -1px;
        color: #1d1d1d;
    }
    a{ text-decoration: none; color: #1d1d1d;}
    li{ list-style: none;}
`;
