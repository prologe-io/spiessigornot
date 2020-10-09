import styled from "styled-components/native";
import { Platfrom } from "react-native";

import Constants from "expo-constants";

export default styled.SafeAreaView`
  flex: 1;
  margin-top: ${Constants.statusBarHeight};
  background-color: #f2f6f9;
`;
