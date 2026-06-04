import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

const HEADER_HEIGHT = "93px";

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(1, 28, 64, 0.08);
  box-shadow: 0 4px 20px rgba(1, 28, 64, 0.06);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--size-notebook);
  width: 90%;
  height: ${HEADER_HEIGHT};
  margin: 0 auto;

  .logo {
    display: inline-flex;
  }

  .logo img {
    width: 150px;
    height: auto;
    display: block;
  }
`;

export const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: ${breakPoints.ipadAir}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: ${pokedexColorsBody.black};
  font-size: 26px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(1, 28, 64, 0.06);
  }

  @media (max-width: ${breakPoints.ipadAir}) {
    display: inline-flex;
  }
`;

export const MobileNav = styled.nav<{ $open: boolean }>`
  display: none;

  @media (max-width: ${breakPoints.ipadAir}) {
    position: absolute;
    top: ${HEADER_HEIGHT};
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 5% 20px;
    background: ${pokedexColorsBody.white};
    border-bottom: 1px solid rgba(1, 28, 64, 0.08);
    box-shadow: 0 16px 28px rgba(1, 28, 64, 0.12);

    transform-origin: top;
    transform: ${({ $open }) =>
      $open ? "translateY(0)" : "translateY(-12px)"};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;

    > div {
      width: 100%;
    }

    a {
      width: 100%;
      border-radius: 12px;
      padding: 14px 18px;
      font-size: 17px;
    }
  }
`;

export const Backdrop = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${breakPoints.ipadAir}) {
    position: fixed;
    inset: ${HEADER_HEIGHT} 0 0 0;
    z-index: 1;
    display: block;
    background: rgba(1, 28, 64, 0.25);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 0.2s ease;
  }
`;
