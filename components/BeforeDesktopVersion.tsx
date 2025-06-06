import React from "react";
import Lottie from "lottie-react";
import animationData from "@/components/LoadingLargeScreenAnim.json";

export default function BeforeDesktopVersion({svgHeight} : {svgHeight?: string}) {
  return (
    <div className="hidden md:block h-fit">
      <h2 className="font-fredoka text-4xl font-medium max-w-[300px] lg:max-w-fit">
        Notre version grand <br className="hidden lg:block" /> écran est bientôt{" "}
        <br className="hidden lg:block xl:hidden" /> disponible :)
      </h2>
      <Lottie
        className={`max-w-[450px] h-[300px] lg:h-[350px] ${svgHeight}`}
        animationData={animationData}
      />
    </div>
  );
}
