import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h4`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${pokedexColorsBody.tinyBlack};
  margin-bottom: 2px;
`;

export const RowProgress = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 84px 34px 1fr;
  align-items: center;
  gap: 8px;
`;

export const TextProgress = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  color: ${pokedexColorsBody.tinyBlack};
`;

export const ValueAbility = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-align: right;
`;

export const ProgressBarBox = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 6px;
  background: #ededed;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => `${$pct}%`};
  background: ${({ $color }) => $color};
  border-radius: 6px;
  transition: width 0.4s ease;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-family: "Inter", sans-serif;
  font-weight: 700;

  span:first-child {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: ${pokedexColorsBody.tinyBlack};
  }

  span:last-child {
    font-size: 16px;
  }
`;
