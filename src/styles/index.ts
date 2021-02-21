import { Dimensions, Platform, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");
const debugStyles = false;

export const colors = {
  primary: "#E63946",
  secondary: "#F1FAEE",
  tertiary: "#A8DADC",
  complementary: "#457B9D",
  background: "#1D3557",

  muted: "#E0E0E0",
  success: "#00C853",
  warning: "#FF6D00",
  danger: "#D50000",

  transparent: "transparent",
  cgpGrey: {
    100: "#ffffff",
    200: "#f6f6f6",
    300: "#eeeeee",
    400: "#cccccc",
    500: "#888888",
    600: "#666666",
    700: "#444444",
    800: "#222222",
    900: "#000000",
  },
};

export default StyleSheet.create({
  container: {
    backgroundColor: !debugStyles ? colors.background : "yellow",
    flex: 1,
    justifyContent: "flex-start",
  },
  headerContainer: {
    backgroundColor: colors.secondary + "10",
    borderBottomColor: "transparent",
  },
  headerTitle: {
    color: colors.secondary,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  headerCenterContainer:{
    alignSelf:'center'
  },
  /////////////////////////////////////
  // List Item
  /////////////////////////////////////
  listTitle: {
    color: colors.cgpGrey[100],
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  listSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.cgpGrey[600],
    textTransform: "uppercase",
  },
  /////////////////////////////////////
  // Input
  /////////////////////////////////////
  containerStyle: {
    marginVertical:10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputContainerStyle: {
    backgroundColor: colors.complementary+ "60",
    borderBottomColor: "transparent",
    borderRadius: 5,
    marginBottom: 0,
  },
  inputIconStyle: {
    width: 40,
    marginLeft: 0,
  },
  inputStyle: {
    fontSize: 15,
    color: colors.cgpGrey[100],
    textTransform: "uppercase",
  },
  inputLabel: {
    fontSize: 15,
    paddingLeft: 0,
    marginBottom: 5,
    color: colors.primary,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  /////////////////////////////////////
  // Other
  /////////////////////////////////////
  buttonTitle: {
    color: colors.secondary,
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 12,
  },
});
