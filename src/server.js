import sirv from 'sirv';
import compression from 'compression';
import polka from 'polka';
import cookieParser from 'cookie-parser';
import * as sapper from '@sapper/server';
import AuthService from './services/authentication/auth.service.js';
import { i18nMiddleware } from './i18n.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const dev = NODE_ENV === 'development';
const authService = new AuthService();

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
    i18nMiddleware(),
    sapper.middleware({
      session: async (req, res) => {
        const cookie = req.cookies;
        const accessToken = cookie[authService.accessTokenCookieName];
        const refreshToken = cookie[authService.refreshTokenCookieName];

        try {
          if ( !accessToken && !refreshToken ) throw new Error("No Tokens");

          let session = { accessToken, refreshToken };
          const data = await authService.me( session );

          const expires = new Date( new Date().getTime() + 24*60*60*1000 );
          res.setHeader('Set-Cookie', [
            authService.accessTokenCookieName + '=' + session.accessToken 
              + ';expires=' + expires.toUTCString() + ';path=/;',
            authService.refreshTokenCookieName + '=' + session.refreshToken
              + ';expires=' + expires.toUTCString() + ';path=/;',
          ]);

          return {
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            authenticated: true,
            user_isVerified: data.user.is_verified,
            user_username: data.user.username,
            company_accountname: data.access_company.accountname,
            user: data.user,
            company: data.access_company,
          };

        } catch (e) {
          return {
            authenticated: false,
          };
        }
      },

    })
  )
  .listen(PORT, (err) => {
    if (err) console.error('error', err);
  });
