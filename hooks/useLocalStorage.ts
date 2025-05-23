import { useState } from 'react';

export default function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : null;
  });

  const dispatch = (toSave: T | ((prevState: T | null) => T)) => {
    try {
      const result = toSave instanceof Function ? toSave(value) : toSave;
      setValue(result);
      window.localStorage.setItem(key, JSON.stringify(result));
    } catch (e) {
      console.error(e);
    }
  };
  return [value, dispatch] as const;
}
