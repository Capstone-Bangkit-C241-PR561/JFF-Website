import Image from "next/image";

export default function AuthPage({ children }) {
  return (
    <div className="h-screen w-full md:bg-secondary  md:flex md:items-center md:justify-center md:p-8">
      <div className="relative md:shadow-lg lg:max-w-[850px] lg:h-[450px] lg:w-full bg-white lg:flex lg:flex-row">
        <div className="w-full h-full flex flex-col">
          <div className="lg:h-full w-full h-1/4 bg-primary p-8 flex flex-col justify-center items-center">
            <Image
              src="/jff-logo.png"
              width={150}
              height={150}
              alt="JogjaFood Finder Logo"
            />
            <p className="text-white text-lg font-heading font-semibold">
              JogjaFood Finder
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
