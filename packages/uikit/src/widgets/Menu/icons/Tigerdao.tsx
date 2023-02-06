import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface IconProps extends  SvgProps {
  isDark: boolean;
}

const Icon: React.FC<IconProps> = ({ isDark, ...props }) => {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
    <path fill={isDark?"#fefcfc":""} d="M175.246 319.38L108.121 182.392 41 319.38l-14.368-7.04 74.3-151.65a8 8 0 0 1 14.368 0l74.31 151.65zM336.754 319.38l-14.368-7.04L396.7 160.69a8 8 0 0 1 7.184-4.48h0a8 8 0 0 1 7.184 4.48l74.3 151.65L471 319.38 403.879 182.392z"/><path fill={isDark?"#fefcfc":""}  d="M188.25 311H28a8.2 8.2 0 0 0-8 8.23c0 45.38 39.531 82.415 88.12 82.415s88.13-37.092 88.13-82.473A8.149 8.149 0 0 0 188.25 311zM484 311H323.75a8.2 8.2 0 0 0-8 8.23c0 45.38 39.535 82.415 88.13 82.415S492 364.553 492 319.172A8.149 8.149 0 0 0 484 311z"/><path fill={isDark?"#fefcfc":""}  d="M446.5,154H264V113H248v41H65.5a8,8,0,0,0,0,16H248V443h16V170H446.5a8,8,0,0,0,0-16Z"/><path fill={isDark?"#fefcfc":""}  d="M256,23.02c-26.147,0-47.42,22.066-47.42,49.19s21.273,49.18,47.42,49.18,47.42-22.062,47.42-49.18S282.147,23.02,256,23.02Z"/><polygon fill={isDark?"#fefcfc":""} points="256 442.16 376.9 442.16 376.9 480.98 135.1 480.98 135.1 442.16 256 442.16"/>
    </Svg>
  );
};

export default Icon;
