import React from "react";
import { StyleSheet } from "react-native";
import { Svg, Defs, Stop, RadialGradient, Rect } from "react-native-svg";

const GradientBackground = ({ color1, color2 }) => {
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient
          id="gradient"
          cx="50%"
          cy="50%"
          r="60%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor={color1} />
          <Stop offset="100%" stopColor={color2} />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
  );
};

export default GradientBackground;
