import { useEffect } from "react";

// @ts-expect-error
export function useOutsideAlerter(ref, closeFunction) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeFunction(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, closeFunction]);
  }