import React from "react";
import { Dimensions, Platform } from "react-native";

import styled from "styled-components/native";

import { LinearGradient } from "expo-linear-gradient";

const Ellipse = () => {
  const baseStyle = {
    position: "absolute",
    width: Dimensions.get("window").width,
    // cannot make it consistently render an ellipsis on all the platforms
    height: Platform.OS !== "web" ? Dimensions.get("window").width : 300,
    transform: [{ scaleX: 3 }],
    zIndex: -1,
    borderRadius: Math.round(Dimensions.get("window").width / 2),
  };

  return <LinearGradient colors={["#6454FA", "#7062FB"]} style={baseStyle} />;
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
      <Noun style={{ paddingTop: 12, fontSize: 30 }}>{children}</Noun>
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
