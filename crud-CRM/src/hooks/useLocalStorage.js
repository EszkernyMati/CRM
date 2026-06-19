import { useState, useEffect } from "react";

/**
 * Działa jak useState, ale zapisuje wartość w localStorage,
 * dzięki czemu dane (kontakty, leady, zadania itd.) przetrwają odświeżenie strony.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      
    }
  }, [key, value]);

  return [value, setValue];
}

export function nextId(list) {
  return list.length ? Math.max(...list.map((i) => i.id)) + 1 : 1;
}
