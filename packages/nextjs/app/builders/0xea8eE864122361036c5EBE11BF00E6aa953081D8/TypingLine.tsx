"use client";
import { useState, useEffect } from "react";

export const TypingLine = () => {
  const dynamicText =
    "Collaborating, learning & building open-source Web3 projects";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 700); // ms
    return () => clearTimeout(delay);
  }, []);


  useEffect(() => {
    if (!started) return;
    if (index < dynamicText.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + dynamicText.charAt(index));
        setIndex((i) => i + 1);
      }, 35); // typing speed (ms per char)
      return () => clearTimeout(timeout);
    }
  }, [started, index, dynamicText]);

  return (
    <>
      <span className=" text-[#f8d56f] ml-2">
        {" "}{displayed}
        <span className="cursor" />
      </span>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cursor {
          display: inline-block;
          width: 8px;
          height: 1em;
          vertical-align: -0.1em;
          opacity: 80%;
          background-color: #f8d56f;
          margin-left: 4px;
          animation: blink 1s step-start infinite;
        }

        /* ensure cursor doesn't push line height; adjust if needed */
        .cursor { box-sizing: content-box; }
      `}</style>
    </>
  );
};
