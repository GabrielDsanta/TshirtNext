import "../../styles/globals.css";

import Image from "next/image";
import NikeSVG from "../assets/nikeLogo.svg";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header className="w-full flex flex-col items-center justify-center mt-[2%] mb-8">
        <Image width={150} height={80} src={NikeSVG.src} alt="" />
        <h1 className="text-white font-bold text-4xl">Nike</h1>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
