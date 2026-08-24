import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Syllabus Concepts Covered:
 * - Custom React Hooks (use...)
 * - useState & useEffect integration
 * - Browser Storage (window.localStorage)
 * - JSON serialization (JSON.stringify / JSON.parse)
 * - Error handling with try/catch
 * 
 * @param {string} key - The localStorage storage key
 * @param {*} initialValue - Default fallback value if key does not exist
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Keep localStorage synchronized whenever state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
