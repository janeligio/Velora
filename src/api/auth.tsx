export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: any; // You could strongly type this
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('https://your-backend.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
}

export async function refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
  const response = await fetch('https://your-backend.com/api/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
}
