import sirv from 'sirv';
import compression from 'compression';
import polka from 'polka';
import cookieParser from 'cookie-parser';
import * as sapper from '@sapper/server';
import axios from 'axios';
import { API_URL } from './store/store.js';
import { i18nMiddleware } from './i18n.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const dev = NODE_ENV === 'development';

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
    i18nMiddleware(),
    sapper.middleware({
      session: async (req, res) => {
        const cookie = req.cookies;
        const AUTH_TOKEN = cookie['JPGE'];

        try {
          const response = await axios.get(`${API_URL}/me/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token ' + AUTH_TOKEN,
            },
          });

          if (response.status === 200) {
            const data = response.data;

            return {
              accessToken: AUTH_TOKEN,
              authenticated: true,
              user_isVerified: data.user.is_verified,
              user_username: data.user.username,
              company_accountname: data.default_company.accountname,
              user: data.user,
              company: data.default_company,
            };
          } else {
            return {
              authenticated: false,
            };
          }
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
