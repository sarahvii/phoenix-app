import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const OverviewTitle = styled.h2`
  background-color: hsl(215,90%,32.7%);
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  
`;

export const ExternalContainerColumn = styled.div`
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 50vh;
    margin: 10px auto;
    width: 86%;
    flex: 1;
    `;

export const ExternalContainerRow = styled.div`
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  height: 50vh;
  margin: 10px auto;
  width: 86%;
  flex: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InternalContainerColumn = styled.div` 
  background-color: #DFE1E6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 10px 20px 0px 20px;
  padding: 6px 16px 16px 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const InternalContainerRow = styled.div` 
  background-color: #DFE1E6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 10px 20px 0px 20px;
  padding: 6px 16px 16px 16px;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const DisplayContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-wrap;
  margin: 1px;
  padding: 12px;
  flex: 1;
  `;
