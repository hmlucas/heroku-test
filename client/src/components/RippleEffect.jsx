import React, { useState, useRef } from "react";
import "./RippleEffect.css";
import useClickStore from "../store/useClickStore";

const RippleEffect = ({ children }) => {
  const [ripples, setRipples] = useState([]);
  const rippleContainerRef = useRef();
  const incrementClickCount = useClickStore(
    (state) => state.incrementClickCount
  );

  const handleClick = (event) => {
    const rect = rippleContainerRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 0.03;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 1200);

    incrementClickCount();
  };

  return (
    <div
      ref={rippleContainerRef}
      className="ripple-container"
      onClick={handleClick}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            top: ripple.y,
            left: ripple.x,
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default RippleEffect;
