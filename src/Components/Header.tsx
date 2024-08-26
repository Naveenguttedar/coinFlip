import { connectWallet } from "../connection";
import { useStateContext } from "../Context";
export default function Header() {
  const { dispatch } = useStateContext();
  const handleClick = async () => {
    console.log("dispatched ");
    const wallet = await connectWallet();
    console.log(wallet);
    dispatch({
      type: "ALERT",
      view: true,
      msg: "Congratulations! Account connected successfully ",
      msgType: "Success",
    });
    dispatch({
      type: "WALLET_CONNECTION",
      walletConnected: wallet?.isWalletConnected,
      userBalance: wallet?.balance,
    });
  };
  return (
    <div className="flex py-4 bg-white px-8 justify-between place-items-center">
      <h1 className="text-3xl leading-3">
        <span className="text-_bg_pink">Flip</span>Coin
      </h1>
      <div>
        <button
          className="bg-_bg_pink text-white px-5 py-3  rounded-md  cursor-pointer "
          onClick={handleClick}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
