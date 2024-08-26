import { useReducer } from "react";

// const [betAmount, setBetAmount] = useState("");
// const [choice, setChoice] = useState("heads");
// const [isFlipping, setIsFlipping] = useState(false);
// const [message, setMessage] = useState("");
// const [lastFlipResult, setLastFlipResult] = useState("");
// const [balance, setBalance] = useState("");
// const [walletConnected, setWalletConnected] = useState(true);
const initialState: StateType = {
  alert: {
    view: !true,
    msg: "Welcome! Connect your account",
    msgType: "Success",
  },
  connection: {
    walletConnected: false,
    userBalance: "",
  },
};

export type StateType = {
  alert: alertType;
  connection: connectionType;
};
type alertType = {
  msg?: string;
  msgType?: string;
  view?: boolean;
};
type connectionType = {
  walletConnected?: boolean;
  userBalance?: string;
};
export interface ActionType extends alertType, connectionType {
  type: string;
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ALERT": {
      return {
        ...state,
        alert: {
          view: action.view!,
          msg: action.msg!,
          msgType: action.msgType!,
        },
      };
    }
    case "WALLET_CONNECTION": {
      return {
        ...state,
        connection: {
          ...state.connection,
          walletConnected: action.walletConnected,
          userBalance: action.userBalance,
        },
      };
    }
    case "WALLET_BALANCE": {
      return {
        ...state,
        connection: {
          ...state.connection,
          userBalance: action.userBalance,
        },
      };
    }
    default:
      return state;
  }
};

export default function useAlertReducer() {
  return useReducer(reducer, initialState);
}
