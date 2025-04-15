export const checkAuth = async (): Promise<boolean> => {
  try {
    // const token = getTokenFromCookie();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ0Njg4MTkyLCJleHAiOjE3NDQ3NzQ1OTJ9.iT4E7KXZ2M7vhqlpZYgfyjrWOV1D3-d8_rRZNULYfSc";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

export const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();
    
    return {
      success: response.ok,
      message: data.message,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login',
    };
  }
}; 


export const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;

  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  console.log(decodedCookie);
  
  const cookies = decodedCookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return null;
};
