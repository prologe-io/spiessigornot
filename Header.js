import React from 'react'
import styled from "styled-components/native";

const Header = styled.View`
  width: 100%;
  border-radius: 3px;
  justify-content:center; 
  align-items: center;
  padding: 16px;
`;

const StyledText = styled.Text`
font-style: normal;
font-weight: normal;
font-size: 12px;
display: flex;
align-items: center;
text-align: center;
color: #BDBDBD;
`;
const Noun = styled.Text`
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 24px;
display: flex;
align-items: center;
text-align: center;
color: #262627;
margin-bottom: 12px;

`

export default () => (
  <Header>
    <Noun>spießig</Noun>
    <StyledText>
      stuffy, conventional, pasty, boringly traditional -- dict.cc
    </StyledText>
  </Header>
);
