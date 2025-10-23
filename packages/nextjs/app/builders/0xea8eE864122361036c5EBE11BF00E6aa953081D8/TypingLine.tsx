"use client";

import { useEffect, useState } from "react";

const dynamicText = "Collaborating, learning & building open-source Web3 projects";

export const TypingLine = () => {
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
        setDisplayed(prev => prev + dynamicText.charAt(index));
        setIndex(i => i + 1);
      }, 35); // typing speed (ms per char)
      return () => clearTimeout(timeout);
    }
  }, [started, index, dynamicText]);

  return (
    <>
      <span className=" text-[#07360b] dark:text-[#f7b733] ml-2">
        {" "}
        {displayed}
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
          opacity: 0.8;
          background-color: #07360b; /* light mode */
          margin-left: 4px;
          animation: blink 1s step-start infinite;
          box-sizing: content-box;
        }
      
        /* DaisyUI dark theme */
        [data-theme="dark"] .cursor {
          background-color: #f8d56f; 
        }
      `}</style>
    </>
  );
};
