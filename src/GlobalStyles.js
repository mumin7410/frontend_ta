// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Set the root font size */
  html {
    font-size: 16px; /* 1rem = 16px by default */
    
    @media (max-width: 768px) {
      font-size: 14px; /* On smaller screens, scale down */
    }
    
    @media (max-width: 480px) {
      font-size: 12px; /* Further scale down for mobile */
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;

export default GlobalStyle;
