import { useState } from "react";
import { useStateContext } from "../Context";
import BtnConnect from "./btnConnect";
type Sides = "Heads" | "Tails";
export default function CoinElement() {
  const [side, setSide] = useState<Sides>("Heads");
  const [effect, setEffect] = useState<boolean>(false);
  const handleToss = () => {
    const randomSide: Sides = getRandomNumber() == 1 ? "Heads" : "Tails";
    console.log(randomSide);
    setEffect(true);
    setSide(randomSide);
  };
  const getRandomNumber = () => {
    return Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  };
  const { state } = useStateContext();

  const message = "",
    lastFlipResult = side;
  console.log(state);
  const [betAmount, setBetAmount] = useState("");
  const [choice, setChoice] = useState("heads");
  return (
    <div className="flex flex-1 flex-col lg:flex-row justify-center place-items-center gap-4 px-4">
      <div className=" w-full flex flex-col items-center ">
        <div
          className={`w-[200px] aspect-square ${side == "Heads" ? "bg-_bg_pink" : "bg-black"} mb-[50px] rounded-[50%] m-auto flex justify-center items-center relative text-center text-3xl uppercase font-bold text-white  ${effect && "animate-toss"}`}
          onAnimationEnd={() => setEffect(false)}
        >
          <div className="w-[87%] aspect-square absolute border-dotted border-2 border-white rounded-[50%]  "></div>
          <h1>{side}</h1>
        </div>
      </div>
      <div className=" w-full p-4 pl-8 ">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Coin Flip Game
        </h1>

        {!state.connection.walletConnected ? (
          <>
            <h1 className="text-xl text-red-800">Connect to MetaMask</h1>
            <h2 className="text-lg py-1">How to play?</h2>
            <ul className="py-2 list-disc pl-4 ">
              <li>Connect to your Ethereum wallet (MetaMask compatible)</li>
              <li>Place a bet using SepoliaETH</li>
              <li>Select heads or tails</li>
              <li> If you guess correctly, you double your bet amount!</li>
            </ul>

            <BtnConnect />
          </>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Your Balance: {state.connection.userBalance} ETH
              </h3>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bet Amount (ETH):
              </label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter amount in ETH"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Choose Side:
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="choice"
                    value="heads"
                    checked={choice === "heads"}
                    onChange={() => setChoice("heads")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Heads</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="choice"
                    value="tails"
                    checked={choice === "tails"}
                    onChange={() => setChoice("tails")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Tails</span>
                </label>
              </div>
            </div>

            <button
              className="bg-_bg_pink text-white px-5 py-3  rounded-md  cursor-pointer "
              onClick={handleToss}
            >
              Flip the coin!
            </button>

            {message && (
              <p className="text-red-500 text-center mt-4">{message}</p>
            )}
            {lastFlipResult && (
              <p className="text-lg font-semibold text-center mt-4">
                Last Flip Result: {lastFlipResult}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
