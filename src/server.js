import sirv from 'sirv';
import compression from 'compression';
import polka from 'polka';
import cookieParser from 'cookie-parser';
import * as sapper from '@sapper/server';
import { API_URL } from './store/store.js';
import axios from 'axios';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
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
              isVerified: data.is_verified,
              username: data.username,
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
