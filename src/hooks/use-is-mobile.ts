import { useState, useEffect } from "react";

export function useIsMobile(number = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < number);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < number);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}
