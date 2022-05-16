import styled from "styled-components";
import { breakPoints } from "../../utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 10;

  @media (max-width: ${breakPoints.ipadAir}) {
    justify-content: center;
    align-items: flex-start;
    padding-top: 70px;
  }

  @media (max-width: ${breakPoints.mobile}) {
    padding: 1rem 0;
    overflow: scroll;
  }
`;

export const ModalWrapper = styled.div`
  width: 800px;
  height: 370px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 8px;

  @media (max-width: ${breakPoints.ipadAir}) {
    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    width: 370px;
  }

  @media (max-width: ${breakPoints.mobile}) {
    overflow-y: scroll;
  }
`;

export const ModalImg = styled.img`
  max-width: 280px;
  max-height: 340px;
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const SideImage = styled.div`
  width: 364px;
  height: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => {
    return props.bgColor;
  }};
  padding: 16px;
  position: relative;
  box-shadow: 4px 4px 8px rgba(1, 28, 64, 0.2);

  @media (max-width: ${breakPoints.ipadAir}) {
    width: 100%;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 30px 23px 30px 0px;

  border-radius: 8px;

  p {
    max-width: 330px;
    max-height: 70px;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    font-weight: 400;
    /* line-height: 24px; */
    letter-spacing: 0em;
    text-align: left;
    align-self: flex-start;
    margin-bottom: 15px;
  }

  @media (max-width: ${breakPoints.ipadAir}) {
    padding-left: 20px;
  }
`;

export const CloseModalButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: -48px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;

  @media (max-width: ${breakPoints.ipadAir}) {
    top: 15px;
  }
`;

export const HeaderModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h1 {
    font-family: "Karla", sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0em;
    text-align: left;
    text-shadow: 4px 4px 4px rgba(33, 33, 33, 0.1);
  }

  span {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: center;
    color: ${props => {
      return props.bgColor;
    }};
  }
`;

export const RowTags = styled.div`
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: absolute;
  bottom: 15px;
  right: 10px;
`;
