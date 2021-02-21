import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  View,
} from "react-native";
import { Button, Header } from "react-native-elements";
import { AppContext } from "../hooks/Context";
import { useSelector } from "react-redux";

import { renderCrypto } from '../functions/Render'
import { Divider } from "../components";
import mainStyles, { colors } from "../styles";

interface Styles {
  button: ViewStyle;
}

export default ({ navigation }: any) => {
  const { context, setContext } = useContext(AppContext);
  const userCrypto = useSelector((state: any) => state.listReducer);

  const setFetch = (bool: boolean) => {
    setContext((prevState: any) => {
      prevState.fetch = bool;
      return { ...prevState };
    });
  }

  return (
    <View style={mainStyles.container}>
      <Header
        barStyle="light-content"
        leftComponent={context.fetch ? <ActivityIndicator size={"small"} color={colors.secondary} /> : { icon: "refresh", color: "#fff", onPress: () => setFetch(true) }}
        centerComponent={{ text: "CryptoTrackerPro", style: mainStyles.headerTitle }}
        rightComponent={{ icon: "add", color: "#fff", onPress: () => navigation.navigate("AddCrypto") }}
        containerStyle={mainStyles.headerContainer}
        leftContainerStyle={context.fetch && {paddingTop:2}}
        centerContainerStyle={mainStyles.headerCenterContainer}
      />
      <Divider />
      <SafeAreaView
        style={{ flex: 1 }}
      >
        <View style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
          {context.currencies.length > 0 && (
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => setFetch(true)}
              />
            }>
              {userCrypto.map((item: string, i: number) => (
                renderCrypto(item)
              ))}
              <Button
                icon={{
                  name: "add",
                  size: 20,
                  color: "white"
                }}
                title="Add a Cryptocurrency"
                titleStyle={mainStyles.buttonTitle}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("AddCrypto")}
              />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </View>
  )

};
const styles = StyleSheet.create<Styles>({
  button: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary + '10',
    borderRadius: 5,
  },
});