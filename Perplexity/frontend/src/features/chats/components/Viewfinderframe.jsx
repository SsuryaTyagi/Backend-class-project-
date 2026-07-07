import React from "react";

/**
 * Camera-style corner brackets that frame the prompt input.
 * Tightens and turns white on focus, like a lens locking focus —
 * the one signature visual element tying back to "VisionAI".
 */
export default function ViewfinderFrame({ focused }) {
  const base = "absolute w-3.5 h-3.5 transition-all duration-200";
  const color = focused ? "border-white" : "border-vision-border-hover";
  const inset = focused ? "6px" : "10px";
  const thickness = focused ? "2px" : "1.5px";

  return (
    <>
      <div
        className={`${base} ${color} top-0 left-0`}
        style={{ top: inset, left: inset, borderTopWidth: thickness, borderLeftWidth: thickness }}
      />
      <div
        className={`${base} ${color} top-0 right-0`}
        style={{ top: inset, right: inset, borderTopWidth: thickness, borderRightWidth: thickness }}
      />
      <div
        className={`${base} ${color} bottom-0 left-0`}
        style={{
          bottom: inset,
          left: inset,
          borderBottomWidth: thickness,
          borderLeftWidth: thickness,
        }}
      />
      <div
        className={`${base} ${color} bottom-0 right-0`}
        style={{
          bottom: inset,
          right: inset,
          borderBottomWidth: thickness,
          borderRightWidth: thickness,
        }}
      />
    </>
  );
}