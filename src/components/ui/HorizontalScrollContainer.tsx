"use client";
import React, { useRef, useEffect } from "react";

const HorizontalScrollContainer = ({ children }) => {
  const scrollableRef = useRef(null);

  useEffect(() => {
    const el = scrollableRef.current;

    const handleWheel = (e) => {
      if (!el) return;

      // Only intercept vertical scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // You *must* forward the ref to the actual scrollable div
  return React.cloneElement(children, { ref: scrollableRef });
};

export default HorizontalScrollContainer;
