import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: clip;

    a {
      text-decoration: none;
    }

    h1, h2, h3 {
      text-decoration: none;
    }

    /* p, span, a {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 36px;
      letter-spacing: 0.02em;      
    } */

    img {
      text-decoration: none;
    }

    /* header {
      h3 {
        font-family: 'Open Sans', sans-serif;
        font-size: 25px;
        font-weight: 400;
        line-height: 34px;
        letter-spacing: 0em;        
      }
    }    */

    
  }
  :root {
    --size-mobile: 600px;
    --size-ipad: 768px;
    --size-ipadPro: 1024px;
    --size-notebook: 1200px;
    --size-desktop: 1800px;

    /* font-family: 'Inter', sans-serif;
    font-family: 'Karla', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif;
    font-family: 'Source Sans Pro', sans-serif; */
         
  }
`;
