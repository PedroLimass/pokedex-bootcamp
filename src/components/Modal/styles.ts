import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: ${breakPoints.mobile}) {
    padding: 12px;
    align-items: flex-start;
  }
`;

export const ModalWrapper = styled.div`
  position: relative;
  width: min(92vw, 860px);
  max-height: 90vh;
  background: #fff;
  color: #000;
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: 340px 1fr;
  overflow: hidden;

  @media (max-width: ${breakPoints.ipadAir}) {
    grid-template-columns: 1fr;
    max-height: 88vh;
    overflow-y: auto;
  }
`;

export const SideImage = styled.div<{ $bgColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: ${({ $bgColor }) => $bgColor};
  padding: 24px;

  @media (max-width: ${breakPoints.ipadAir}) {
    padding: 32px 24px 20px;
  }
`;

export const ModalImg = styled.img`
  width: 100%;
  max-width: 240px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));

  @media (max-width: ${breakPoints.mobile}) {
    max-width: 180px;
  }
`;

export const RowTags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 28px 32px;
  overflow-y: auto;

  p.description {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    line-height: 22px;
    color: ${pokedexColorsBody.tinyBlack};
    margin-bottom: 18px;
  }

  @media (max-width: ${breakPoints.ipadAir}) {
    overflow-y: visible;
    padding: 20px 24px 28px;
  }
`;

export const HeaderModal = styled.div<{ $bgColor: string }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  h1 {
    font-family: "Karla", sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    text-align: left;
  }

  span {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: ${({ $bgColor }) => $bgColor};
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: #333;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: #fff;
    transform: scale(1.08);
  }
`;

export const Section = styled.div`
  margin-top: 18px;
`;

export const SectionTitle = styled.h4`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${pokedexColorsBody.tinyBlack};
  margin-bottom: 8px;
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const AbilityChip = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(1, 28, 64, 0.06);
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${pokedexColorsBody.black};

  small {
    color: ${pokedexColorsBody.tinyBlack};
    opacity: 0.7;
    font-size: 11px;
    margin-left: 4px;
  }
`;

export const WeaknessChip = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  color: ${pokedexColorsBody.white};
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;

  strong {
    font-weight: 700;
    font-size: 12px;
    opacity: 0.9;
  }
`;
