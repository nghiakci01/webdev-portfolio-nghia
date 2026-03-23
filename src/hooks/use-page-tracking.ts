import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * usePageTracking Hook
 * Automatically track page views when route changes
 * 
 * Usage:
 * ```tsx
 * function App() {
 *   usePageTracking();
 *   return <Routes>...</Routes>;
 * }
 * ```
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Track page view when pathname changes
    trackPageView(location.pathname);
  }, [location.pathname]);
}

export default usePageTracking;
