import React from "react";
import { useSpring, animated } from "@react-spring/web";

export const NumberStats = ({ n, className = "" }) => {
  const { number } = useSpring({
    number: n,
    from: { number: 0 },
    config: { mass: 1, tension: 20, friction: 10 },
    delay: 200,
  });

  return (
    <div>
      <animated.div className={`mb-2 font-bold  ${className}`}>
        {n}
      </animated.div>
    </div>
  );
};
