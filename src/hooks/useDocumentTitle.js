import { useEffect } from 'react';

/**
 * Custom Hook: useDocumentTitle
 * Syllabus Concepts Covered:
 * - Custom React Hooks
 * - Side effects with useEffect
 * - DOM manipulation (document.title)
 * - Effect cleanup / dependency array
 * 
 * @param {string} title - Page title to set
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | Udaan Foundation` : 'Udaan - Child Welfare Foundation';

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
