import styled from "styled-components";

export const Container = styled.div`
  width: 320px;
  height: 100px;

  display: flex;
  margin-top: 35px;
  flex-direction: column;
  gap: 14px;
`;

export const RowProgress = styled.div`
  width: 100%;
  height: 14px;
  display: flex;
  flex-direction: row;

  align-items: center;
`;

export const TextProgress = styled.div`
  width: 72px;
  height: auto;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
`;

export const ValueAbility = styled.div`
  width: 30px;
  margin-right: 3px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;

  letter-spacing: 0em;
  text-align: center;
`;

export const ProgressBarBox = styled.div`
  max-width: 200px;
  width: 100%;
`;
