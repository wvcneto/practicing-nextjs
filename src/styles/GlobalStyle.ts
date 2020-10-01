import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #26262b;
    color: #f2f2f4;
    font-family:  Roboto, Helvetica, Arial, sans-serif
  }

  button {
    cursor: pointer;
  }
`;