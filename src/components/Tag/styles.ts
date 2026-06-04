import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const TagType = styled.div<{ $size?: "high" }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: ${({ $size }) => ($size === "high" ? "71px" : "51px")};
  height: ${({ $size }) => ($size === "high" ? "30px" : "16px")};

  font-family: "Source Sans Pro", sans-serif;
  font-size: ${({ $size }) => ($size === "high" ? "14px" : "8px")};
  font-weight: ${({ $size }) => ($size === "high" ? "400" : "500")};
  letter-spacing: 0em;
  text-align: center;
  color: ${pokedexColorsBody.white};

  background: rgb(255, 255, 255, 0.4);
  border-radius: 38px;
`;
