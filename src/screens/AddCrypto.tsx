import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  FlatList,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Avatar, Button, Header, Input, Icon, ListItem } from "react-native-elements";
import { AppContext } from "../hooks/Context";
import { useSelector, useDispatch } from "react-redux";
import { addCrypto, removeCrypto } from '../redux/actions'

import { TextDivider } from "../components";
import mainStyles, { colors } from "../styles";

interface Styles {
  button: ViewStyle;
}

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const { context } = useContext(AppContext);
  const [allCurrencies, setAllCurrencies] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const userCrypto = useSelector((state: any) => state.listReducer);

  useEffect(() => {
    setAllCurrencies(context)
  }, [context, modalVisible]);

  const searchFilterFunction = (text: string) => {
    let arrayToSearch = context;

    const newData = arrayToSearch.filter((item) => {
      let itemData = `${item.name.toUpperCase()}`;
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
        <ScrollView keyboardShouldPersistTaps="always">
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
              <Avatar source={{ uri: `https://messari.io/asset-images/${item.id}/64.png` }} />
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