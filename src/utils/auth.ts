import Cookies from 'js-cookie';
import { AUTH_CONFIG } from '../config/auth';

interface TokenData {
  id_token?: string;
  access_token?: string;
  expires_in?: string;
}

interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  [key: string]: any;
}

export function setTokens(tokens: TokenData): void {
  if (tokens.access_token) {
    Cookies.set(AUTH_CONFIG.COOKIE_NAME.ACCESS_TOKEN, tokens.access_token, {
      expires: AUTH_CONFIG.TOKEN_EXPIRY_DAYS,
      secure: true,
      sameSite: 'lax'
    });
  }

  if (tokens.id_token) {
    Cookies.set(AUTH_CONFIG.COOKIE_NAME.ID_TOKEN, tokens.id_token, {
      expires: AUTH_CONFIG.TOKEN_EXPIRY_DAYS,
      secure: true,
      sameSite: 'lax'
    });
  }
}

export function getAccessToken(): string | undefined {
  return Cookies.get(AUTH_CONFIG.COOKIE_NAME.ACCESS_TOKEN);
}

export function getIdToken(): string | undefined {
  return Cookies.get(AUTH_CONFIG.COOKIE_NAME.ID_TOKEN);
}

export function removeTokens(): void {
  Cookies.remove(AUTH_CONFIG.COOKIE_NAME.ACCESS_TOKEN);
  Cookies.remove(AUTH_CONFIG.COOKIE_NAME.ID_TOKEN);
}

export function parseHashParams(hash: string): TokenData {
  if (!hash) return {};
  
  return hash
    .substring(1)
    .split('&')
    .reduce((params: TokenData, item) => {
      const [key, value] = item.split('=');
      params[key as keyof TokenData] = decodeURIComponent(value);
      return params;
    }, {});
}

export function parseIdToken(): DecodedToken | null {
  const token = getIdToken();
  console.log("hasil 1 "+token);
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    console.log("hasil 2 " + JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing ID token:', error);
    return null;
  }
}

export function getCognitoLoginUrl(): string {
  const params = new URLSearchParams({
    client_id: AUTH_CONFIG.COGNITO.CLIENT_ID,
    response_type: 'token',
    scope: AUTH_CONFIG.COGNITO.SCOPE.join(' '),
    redirect_uri: AUTH_CONFIG.COGNITO.REDIRECT_URI
  });
  console.log(`${AUTH_CONFIG.COGNITO.DOMAIN}/login?${params.toString()}`);

  return `${AUTH_CONFIG.COGNITO.DOMAIN}/login?${params.toString()}`;
}

export function isAuthenticated(): boolean {
  return !!(getAccessToken() && getIdToken());
}