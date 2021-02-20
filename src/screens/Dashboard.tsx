import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
  Modal,
} from "react-native";
import { Header } from "react-native-elements";

import mainStyles, { colors } from "../styles/";

interface Styles {
  button: ViewStyle;
}

export default ({ navigation, route }) => {
  return (
    <View style={mainStyles.container}>
      <Header
        barStyle="light-content"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={mainStyles.headerContainer}
      />
    </View>
  )
};
const styles = StyleSheet.create<Styles>({
  button: {
    backgroundColor: "red"
  }
});