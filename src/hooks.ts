import { useState, useCallback, useMemo, useEffect } from "react";
import { detectDirection, type Direction } from "./detect.js";

export function useDirection(initialDirection: Direction = "ltr") {
  const [direction, setDirection] = useState<Direction>(initialDirection);

  const toggleDirection = useCallback(() => {
    setDirection((d) => (d === "rtl" ? "ltr" : "rtl"));
  }, []);

  return { direction, setDirection, toggleDirection } as const;
}

export function useTextDirection(text: string): Direction {
  return useMemo(() => detectDirection(text), [text]);
}

export function useDocumentDirection(): Direction {
  const [direction, setDirection] = useState<Direction>("ltr");

  useEffect(() => {
    const update = () => {
      const dir =
        document.documentElement.getAttribute("dir") ??
        document.body.getAttribute("dir") ??
        getComputedStyle(document.documentElement).direction;
      setDirection(dir === "rtl" ? "rtl" : "ltr");
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  return direction;
}
