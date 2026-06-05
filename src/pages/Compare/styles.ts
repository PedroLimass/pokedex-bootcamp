import styled from "styled-components";
import {
  pokedexColors,
  pokedexColorsBody,
  pokedexColorsDark,
} from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--size-notebook);
  margin: 0 auto;
  padding: 6.25rem 1rem 4rem;
`;

export const HeaderText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 35px;
  font-weight: 400;
  line-height: 42px;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 12px;
  color: ${pokedexColorsBody.black};

  @media (max-width: ${breakPoints.mobile}) {
    font-size: 26px;
    line-height: 34px;
  }
`;

export const Subtitle = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  text-align: center;
  color: ${pokedexColorsBody.tinyBlack};
  margin-bottom: 40px;
  max-width: 640px;
`;

export const Arena = styled.div`
  display: grid;
  grid-template-columns: 1fr 64px 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: ${breakPoints.ipadAir}) {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 0;
  }
`;

export const VsBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${pokedexColors.fire};
  color: ${pokedexColorsBody.white};
  font-family: "Inter", sans-serif;
  font-size: 22px;
  font-weight: 800;
  justify-self: center;
`;

export const ResultPanel = styled.section`
  width: 100%;
  max-width: 760px;
  margin: 44px auto 0;
  padding: 32px;
  border-radius: 20px;
  background: ${pokedexColorsBody.white};
  box-shadow: 0 12px 32px rgba(1, 28, 64, 0.14);

  @media (max-width: ${breakPoints.mobile}) {
    padding: 20px 14px;
    border-radius: 16px;
  }
`;

export const WinnerBanner = styled.div`
  text-align: center;
  margin-bottom: 28px;

  h2 {
    font-family: "Karla", sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: ${pokedexColorsBody.black};
    text-transform: capitalize;
    margin-bottom: 6px;
  }

  p {
    font-family: "Open Sans", sans-serif;
    font-size: 15px;
    color: ${pokedexColorsBody.tinyBlack};
  }

  @media (max-width: ${breakPoints.mobile}) {
    margin-bottom: 20px;

    h2 {
      font-size: 23px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const Combatants = styled.div`
  display: grid;
  grid-template-columns: 1fr 64px 1fr;
  align-items: center;
  gap: 24px;

  @media (max-width: ${breakPoints.mobile}) {
    grid-template-columns: 1fr 32px 1fr;
    gap: 6px;
  }
`;

type CombatantState = "winner" | "loser" | "draw";

export const Combatant = styled.div<{ $state: CombatantState }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
  border-radius: 16px;
  background: ${({ $state }) =>
    $state === "winner" ? "rgba(72, 208, 176, 0.16)" : "transparent"};
  border: 2px solid
    ${({ $state }) =>
      $state === "winner" ? pokedexColors.grass : "transparent"};
  opacity: ${({ $state }) => ($state === "loser" ? 0.55 : 1)};
  filter: ${({ $state }) =>
    $state === "loser" ? "grayscale(0.6)" : "none"};
  transition: all 0.2s ease;

  img {
    width: 110px;
    height: 110px;
    object-fit: contain;
  }

  @media (max-width: ${breakPoints.mobile}) {
    padding: 12px 4px;
    gap: 6px;

    img {
      width: 72px;
      height: 72px;
    }
  }
`;

export const Crown = styled.span`
  position: absolute;
  top: -14px;
  font-size: 26px;
  line-height: 1;
`;

export const CombatantName = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${pokedexColorsBody.black};
  text-transform: capitalize;
  text-align: center;
  word-break: break-word;

  @media (max-width: ${breakPoints.mobile}) {
    font-size: 14px;
  }
`;

export const ResultVs = styled.div`
  width: 64px;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: ${pokedexColors.fire};
  justify-self: center;

  @media (max-width: ${breakPoints.mobile}) {
    width: 32px;
    font-size: 15px;
  }
`;

export const HpBarTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 6px;
  background: #ededed;
  overflow: hidden;
`;

export const HpBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => `${$pct}%`};
  background: ${({ $color }) => $color};
  border-radius: 6px;
  transition: width 0.4s ease;
`;

export const HpText = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  color: ${pokedexColorsBody.tinyBlack};
  white-space: nowrap;

  @media (max-width: ${breakPoints.mobile}) {
    font-size: 11px;
  }
`;

export const Meta = styled.p`
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: ${pokedexColorsBody.tinyBlack};
  margin: 24px 0 8px;
`;

export const CompareTable = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  border-top: 1px solid #eee;
`;

export const CompareRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  @media (max-width: ${breakPoints.mobile}) {
    gap: 8px;
  }
`;

export const CompareLabel = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${pokedexColorsBody.tinyBlack};
  white-space: nowrap;
  text-align: center;

  @media (max-width: ${breakPoints.mobile}) {
    font-size: 11px;
    letter-spacing: 0;
    white-space: normal;
  }
`;

export const CompareCell = styled.strong<{
  $highlight?: boolean;
  $align?: "left" | "right";
}>`
  font-family: "Inter", sans-serif;
  font-size: 17px;
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};
  text-align: ${({ $align }) => ($align === "right" ? "right" : "left")};
  color: ${({ $highlight }) =>
    $highlight ? pokedexColorsDark.grass : pokedexColorsBody.black};
`;

export const CompareBtn = styled.button`
  margin-top: 32px;
  cursor: pointer;
  height: 56px;
  padding: 0 32px;
  background-color: ${pokedexColors.water};
  border: none;
  border-radius: 11px;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${pokedexColorsBody.white};

  &:hover:not(:disabled) {
    background-color: ${pokedexColorsDark.water};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Hint = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: ${pokedexColorsBody.tinyBlack};
  font-family: "Open Sans", sans-serif;
`;
