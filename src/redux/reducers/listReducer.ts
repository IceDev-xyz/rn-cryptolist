const listReducer = (
  state = ["1e31218a-e44e-4285-820c-8282ee222035"] as string[],
  action: any
) => {
  switch (action.type) {
    case "addCrypto":
      //return state.push(action.payload);
      return [...state, action.payload]
    case "removeCrypto":
      //return state.splice(state.indexOf(action.payload), 1);
      return [...state.filter(item => item !== action.payload)]
      case "restoreCrypto":
        return JSON.parse(action.payload)
    default:
      return state;
  }
};

export default listReducer;
