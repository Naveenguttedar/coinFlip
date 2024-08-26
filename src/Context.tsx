import React, { ReactNode, createContext, useContext } from "react";
import useAlertReducer, { ActionType, StateType } from "./Helper";

type StateContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

const StateContext = createContext<StateContextType | null>(null);

export function StateContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useAlertReducer();
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useAlertContext must be used within a StateContextProvider",
    );
  }
  return context;
};
