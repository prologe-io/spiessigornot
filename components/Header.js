import React from "react";
import styled from "styled-components/native";

import { LinearGradient } from "expo-linear-gradient";

const Ellipse = () => {
  return (
    <LinearGradient
      colors={["#6454FA", "#7062FB"]}
      style={{
        position: "absolute",
        top: "-60",
        height: 250,
        width: "120%",
        borderRadius: "50%",
        zIndex: "-1",
      }}
    />
  );
};

const Header = styled.View`
  position: relative;
  width: 100%;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const BaseText = styled.Text`
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
`;

const StyledText = styled(BaseText)`
  font-size: 12px;
`;
const Noun = styled(BaseText)`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 12px;
`;

export default ({ children }) => (
  <Header>
    <Ellipse />
    {children ? (
      <Noun style={{marginTop: 12, fontSize: 30}}>{children}</Noun>
    ) : (
      <>
        <Noun>spießig</Noun>
        <StyledText>
          stuffy, conventional, pasty, boringly traditional -- dict.cc
        </StyledText>
      </>
    )}
  </Header>
);
