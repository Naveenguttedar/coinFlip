import BtnConnect from "./btnConnect";
export default function Header() {
  return (
    <div className="flex py-4 bg-white px-8 justify-between place-items-center">
      <h1 className="text-3xl leading-3">
        <span className="text-_bg_pink">Flip</span>Coin
      </h1>
      <div>
        <BtnConnect />
      </div>
    </div>
  );
}
