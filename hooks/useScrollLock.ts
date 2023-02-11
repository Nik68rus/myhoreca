import { useLayoutEffect } from 'react';
const breakpointSm = window.matchMedia('(max-width: 767px)');

const useScrollLock = (params?: { mobileOnly: boolean; active?: boolean }) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (
      (params && params.mobileOnly && params.active && breakpointSm.matches) ||
      !params ||
      (params && !params.mobileOnly && params.active)
    ) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [params, params?.mobileOnly, params?.active]);
};

export default useScrollLock;
