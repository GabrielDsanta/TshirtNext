import "../../styles/globals.css";

import Image from "next/image";
import NikeSVG from "../assets/nikeLogo.svg";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header className="w-full flex flex-col items-center justify-center mt-[2%] mb-8">
        <Link href="/">
          <div className="cursor-pointer flex flex-col items-center justify-center">
            <Image width={150} height={80} src={NikeSVG.src} alt="" />
            <h1 className="text-white font-bold text-4xl">Nike</h1>
          </div>
        </Link>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
