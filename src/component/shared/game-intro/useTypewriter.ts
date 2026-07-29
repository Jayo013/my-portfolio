import { useEffect, useRef, useState } from "react";

type Options = {
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
};

export function useTypewriter(text: string, { speed = 45, startDelay = 0, enabled = true }: Options = {}) {
  const [output, setOutput] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setOutput(text);
      setDone(true);
      return;
    }

    setOutput("");
    setDone(false);
    let i = 0;

    const startTimer = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [text, speed, startDelay, enabled]);

  return { output, done };
}
