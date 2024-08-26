import { connectWallet } from "../connection";
import { useStateContext } from "../Context";
export default function BtnConnect() {
  const { state, dispatch } = useStateContext();
  const handleClick = async () => {
    const wallet = await connectWallet();
    if (wallet?.isWalletConnected) {
      dispatch({
        type: "ALERT",
        view: true,
        msg: "Congratulations! Account connected successfully ",
        msgType: "Success",
      });
    }
    dispatch({
      type: "WALLET_CONNECTION",
      walletConnected: wallet?.isWalletConnected,
      userBalance: wallet?.balance,
    });
  };
  return (
    <button
      className="bg-_bg_pink text-white px-5 py-3  rounded-md  cursor-pointer "
      onClick={handleClick}
    >
      {state.connection.walletConnected ? "Connected" : "Connect"}
    </button>
  );
}
