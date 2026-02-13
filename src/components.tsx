import React from "react";
import { detectDirection, type Direction } from "./detect.js";

export interface BidiTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export function BidiText({
  children,
  as: Tag = "span",
  className,
  style,
}: BidiTextProps) {
  const direction = detectDirection(children);
  return React.createElement(
    Tag,
    { dir: direction, className, style },
    children,
  );
}

export interface DirectionProviderProps {
  direction: Direction;
  children: React.ReactNode;
}

export function DirectionProvider({
  direction,
  children,
}: DirectionProviderProps) {
  return React.createElement("div", { dir: direction }, children);
}

export interface RtlFlipProps {
  rtl: React.ReactNode;
  ltr: React.ReactNode;
  direction: Direction;
}

export function RtlFlip({ rtl, ltr, direction }: RtlFlipProps) {
  return React.createElement(
    React.Fragment,
    null,
    direction === "rtl" ? rtl : ltr,
  );
}
