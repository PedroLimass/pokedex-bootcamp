import styled from "styled-components";

export const Container = styled.div`
  max-width: 295px;
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: space-between;

  > :first-child {
    padding-right: 24px;
    align-items: center;
    border-right: 1px solid #e0e0e0;
  }

  > :last-child {
    padding-left: 24px;
    border-left: 1px solid #e0e0e0;
  }
`;

export const BoxData = styled.div`
  flex-grow: 1;
  width: 100%;
  /* background-color: blue; */

  p {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: center;
  }
`;

export const TitleState = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 10px;
`;

export const DataTextAndIcon = styled.div`
  display: flex;
  width: 100%;
  height: 16px;
  margin-top: 10px;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  gap: 8px;
`;

export const DataTextAndIconLast = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  flex-direction: row;
  align-self: center;
  justify-content: flex-start;
  line-height: -10px;
  /* padding-top: 10px; */
  text-align: justify;
`;
export const TextStates = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 14px !important;
  font-weight: 500 !important;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
`;

export const TextStatesLast = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px !important;
  font-weight: 500 !important;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
`;
