import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../../providers/auth-provider';

type PageLoggerProps = {
  endpoint?: string;
};

export const PageLogger = ({ endpoint = '/api/logs/page-view' }: PageLoggerProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const logPageView = async () => {
      // Avoid logging the same page twice
      if (previousPath.current === location.pathname) return;
      previousPath.current = location.pathname;

      const payload = {
        path: location.pathname,
        timestamp: new Date().toISOString(),
        userId: user?.id || null,
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
      };

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Failed to log page view', await response.text());
        }
      } catch (error) {
        console.error('Failed to log page view', error);
      }
    };

    logPageView();
  }, [location.pathname, endpoint, user?.id]);

  return null;
};
