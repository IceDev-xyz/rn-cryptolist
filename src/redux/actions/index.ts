export const addCrypto = (coin: string) => {
  return {
    type: "addCrypto",
    payload: coin,
  };
};

export const removeCrypto = (coin: string) => {
  return {
    type: "removeCrypto",
    payload: coin,
  };
};

export const restoreCrypto = (local: string) =>{
  return {
    type: "restoreCrypto",
    payload: local,
  };
}