import { useAuth } from '../providers/auth-provider';

export const useFetcher = () => {
  const { accessToken, logout } = useAuth();

  const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    const headers = new Headers(init?.headers || {});

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    try {
      const response = await fetch(input, {
        ...init,
        headers,
      });

      if (response.status === 401) {
        // Unauthorized – maybe token expired
        logout();
        throw new Error('Unauthorized');
      }

      return response;
    } catch (error) {
      console.error('API fetch failed:', error);
      throw error;
    }
  };

  return fetcher;
};
