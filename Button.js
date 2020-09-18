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
  font-weight: bold;
`;

const SecondaryText = styled.Text`
  color: #2f80ed;
  font-weight: bold;
`;

export default ({ children, primary, onPress }) => {
  if (primary) {
    return (
      <PrimaryButton onPress={onPress}>
        <Text>{children}</Text>
      </PrimaryButton>
    );
  }

  return (
    <SecondaryButton onPress={onPress}>
      <SecondaryText>{children}</SecondaryText>
    </SecondaryButton>
  );
};
