"use client";

import { useEffect, useState } from "react";
import styles from "./TypingLine.module.css";

const dynamicText = "Collaborating, learning & building open-source Web3 projects";

export const TypingLine = () => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 700);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (index < dynamicText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + dynamicText.charAt(index));
        setIndex(i => i + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [started, index]);

  return (
    <span className="text-[#07360b] dark:text-[#f7b733] ml-2">
      {displayed}
      <span
        className={`
          inline-block
          w-2
          h-[1em]
          ml-1
          align-[-0.1em]
          opacity-80
          bg-[#07360b]
          dark:bg-[#f8d56f]
          box-content
          ${styles.animateBlink}
        `}
        aria-hidden
      />
    </span>
  );
};
