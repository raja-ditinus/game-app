import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SpaceShipIcon({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L16 10L22 12L16 14L12 22L8 14L2 12L8 10L12 2Z"
        fill="#38BDF8"
      />
    </Svg>
  );
}