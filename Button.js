import React from "react";
import styled from "styled-components/native";

const PrimaryButton = styled.TouchableOpacity`
  background: #2f80ed;
  border-radius: 13px;
  min-height: 40px;
  min-width: 150px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const SecondaryButton = styled.TouchableOpacity`
  border: 2px solid #2f80ed;
  border-radius: 13px;
  min-height: 40px;
  min-width: 150px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
`;

const SecondaryText = styled.Text`
  color: #2f80ed;
`;

export default ({ children, primary, ...rest }) => {
  if (primary) {
    return (
      <PrimaryButton {...rest}>
        <Text>{children}</Text>
      </PrimaryButton>
    );
  }

  return (
    <SecondaryButton {...rest}>
      <SecondaryText>{children}</SecondaryText>
    </SecondaryButton>
  );
};
