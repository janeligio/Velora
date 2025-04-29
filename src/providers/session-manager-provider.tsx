import React, { useState, useEffect } from 'react';
import { useAuth } from './auth-provider';

const REFRESH_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes
const COUNTDOWN_DURATION = 60; // 60 seconds (1 minute)

export const SessionManager = ({ children }: { children: React.ReactNode }) => {
  const { refresh, logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      setShowDialog(true);
      setCountdown(COUNTDOWN_DURATION);
    }, REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (showDialog) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (countdownTimer) clearInterval(countdownTimer);
    };
  }, [showDialog]);

  useEffect(() => {
    if (countdown <= 0 && showDialog) {
      logout(); // User didn't confirm in time
    }
  }, [countdown, showDialog, logout]);

  const handleContinue = async () => {
    try {
      await refresh();
      setShowDialog(false); // Hide dialog on success
    } catch (error) {
      console.error('Failed to refresh session', error);
      logout(); // Fail safe
    }
  };

  return (
    <>
      {children}

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Session Expiring</h2>
            <p className="mb-4">Your session will expire in {countdown} seconds.</p>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};
