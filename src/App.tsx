import { useEffect } from "react";
import Alert from "./Components/Alert";
import CoinElement from "./Components/CoinElement";
import Header from "./Components/Header";
import { StateContextProvider } from "./Context";
export default function App() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="w-full h-screen ">
        <StateContextProvider>
          <Header />
          <Alert />
          <CoinElement />
        </StateContextProvider>
      </div>
    </>
  );
}
