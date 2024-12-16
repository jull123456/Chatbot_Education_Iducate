export const AUTH_CONFIG = {
  COOKIE_NAME: {
    ACCESS_TOKEN: 'onionix_access_token',
    ID_TOKEN: 'onionix_id_token'
  },
  TOKEN_EXPIRY_DAYS: 1, // Set to 1 day since token expires in 86400 seconds (24 hours)
  COGNITO: {
    REGION: 'ap-southeast-1',
    CLIENT_ID: '59ltf745l5pspi4sqbot3oru7o',
    DOMAIN: 'https://ap-southeast-1qlx1wpkiu.auth.ap-southeast-1.amazoncognito.com',
    REDIRECT_URI: 'https://main.d17l79epd2nsp2.amplifyapp.com/callback', // Changed for local development
    SCOPE: ['email', 'openid', 'phone', 'profile']
  }
};