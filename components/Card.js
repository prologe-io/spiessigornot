import React from "react";
import styled from "styled-components/native";

export const StyledCard = styled.View`
  max-width: 350px;
  padding: 16px;
  margin: 16px;
  background-color: white;
`;

export const Card = ({ children, ...rest }) => (
  <StyledCard
    {...rest}
    style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    }}
  >
    {children}
  </StyledCard>
);

export const CardTitle = styled.Text`
  margin-bottom: 16px;
  max-width: 180px;
`;
