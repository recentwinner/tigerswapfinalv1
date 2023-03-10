import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 100 100" {...props}>
     <path d="M50 12c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zm0 72c-18.8 0-34-15.2-34-34s15.2-34 34-34 34 15.2 34 34-15.2 34-34 34zM39 54c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm.1-31.9c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.2-7-7-7zm0 10c-1.7 0-3-1.4-3-3 0-1.7 1.4-3 3-3s3 1.4 3 3-1.4 3-3 3zm21.8 11.8c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10c-1.6 0-3-1.3-3-3 0-1.6 1.4-3 3-3 1.7 0 3 1.4 3 3 0 1.7-1.3 3-3 3zM61 32c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.6 0 3 1.3 3 3s-1.4 3-3 3z"/>
     <path fill="#00F" d="M524-1210V474h-1784v-1684H524m8-8h-1800V482H532v-1700z"/>
    </Svg>
  );
};

export default Icon;
