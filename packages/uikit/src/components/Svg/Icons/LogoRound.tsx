import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
       <image width={90} height={90} href="/images/LogoRound.png"/>
    </Svg>
  );
};

export default Icon;
