import { createContext } from "react";

interface AppContextInterface {
  context: any;
  setContext: any;
}

export const AppContext = createContext<AppContextInterface>({context:null,setContext:null});