import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ScrollView,
  View,
} from "react-native";
import { Avatar, Header, Input, Icon, ListItem } from "react-native-elements";
import { AppContext } from "../hooks/Context";
import { useSelector, useDispatch } from "react-redux";
import { addCrypto, removeCrypto } from '../redux/actions'

import mainStyles, { colors } from "../styles";

interface Styles {
  button: ViewStyle;
}

export default ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { context } = useContext(AppContext);
  const [allCurrencies, setAllCurrencies] = useState([])
  const userCrypto = useSelector((state: any) => state.listReducer);

  useEffect(() => {
    setAllCurrencies(context.currencies)
  }, [context]);

  const searchFilterFunction = (text: string) => {
    let arrayToSearch = context.currencies;
    const newData = arrayToSearch.filter((item: any) => {
      let itemData = `${item.name.toUpperCase()}${item.symbol.toUpperCase()}`;
      let textData = text.toUpperCase();
      itemData = itemData
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trimRight();
      textData = textData
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trimRight();
      return itemData.indexOf(textData) > -1;
    });
    setAllCurrencies(newData)
  };

  return (
    <View style={mainStyles.container}>
      <Header
        barStyle="light-content"
        leftComponent={{ icon: "arrow-left", type: "feather", color: "#fff", onPress: () => navigation.goBack() }}
        centerComponent={{ text: "Add a cryptocurrency", style: mainStyles.headerTitle }}
        containerStyle={mainStyles.headerContainer}
        centerContainerStyle={mainStyles.headerCenterContainer}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: colors.background,
          }}
        >
          <Input
            renderErrorMessage={false}
            placeholder="Use a name or ticker symbol..."
            autoCorrect={false}
            leftIcon={{
              name: "search",
              color: colors.secondary,
            }}
            inputStyle={mainStyles.inputStyle}
            inputContainerStyle={mainStyles.inputContainerStyle}
            leftIconContainerStyle={mainStyles.inputIconStyle}
            containerStyle={mainStyles.containerStyle}
            onChangeText={(value: string) =>
              searchFilterFunction(value)
            }
          />
          <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            {allCurrencies.map((item: any) => (
              <ListItem
                key={item.id}
                underlayColor={"transparent"}
                containerStyle={{
                  paddingHorizontal: 0,
                  backgroundColor: "transparent",
                }}
                onPress={() => {
                  userCrypto.findIndex(
                    (element: string) => element == item.id
                  ) === -1
                    ? dispatch(addCrypto(item.id))
                    : dispatch(removeCrypto(item.id))
                }}
              >
                <Avatar placeholderStyle={{ backgroundColor: 'transparent' }} source={{ uri: `https://messari.io/asset-images/${item.id}/64.png` }} />
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color: colors.cgpGrey[100],
                      textTransform: "capitalize",
                    }}
                  >
                    {item.slug}
                  </ListItem.Title>
                </ListItem.Content>
                < Avatar
                  rounded
                  icon={{
                    name: 'check', type: 'font-awesome', color: userCrypto.findIndex(
                      (element: string) => element == item.id
                    ) === -1
                      ? colors.tertiary
                      : colors.cgpGrey[100],
                  }}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: userCrypto.findIndex(
                      (element: string) => element == item.id
                    ) === -1
                      ? colors.complementary
                      : colors.primary,
                  }}
                />
              </ListItem>
            ))}
          </ScrollView>
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