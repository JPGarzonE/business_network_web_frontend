import RequestError from './requestError.js';
import { API_URL } from '../../store/store.js';
import axios from 'axios';
import { refreshSession } from '../../store/store.js';


export default class RequestService {
  constructor() {
  }
  
  get URL() {
    return new URL(API_URL);
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json'
    }
  }

  get authPrefix() {
    return 'Bearer';
  }

  get refreshCredentialsPath() {
    return 'token/refresh/';
  }

  get accessTokenCookieName() {
    return 'JPGE';
}

  get refreshTokenCookieName() {
      return 'RJPGE';
  }

  get tokenNotValidCode() {
    return 'token_not_valid';
  }

  /* All the application requests have to passed through 
  this _fetch for automatic credentials refresh */
  async _fetch({ url, config = {}, session = {}, isRetry = false }) {
    config = {
      validateStatus: null, // Axios resolve all the promises
      ...config
    }

    config.headers = {...this.baseHeaders, ...config.headers};
    
    if( session.accessToken )
      config.headers = {
        ...config.headers,
        Authorization: `${this.authPrefix} ${session.accessToken}`
      }

    let response = await axios(url, config);

    if( !isRetry && response.status === 401 &&
        session.accessToken && session.refreshToken &&
        response.data.code === this.tokenNotValidCode
      ) {
        const refreshResponse = await this.refreshCredentials({
          session: session,
          isRetry: true
        });

        if( refreshResponse.status >= 200 && refreshResponse.status < 300 ) {
          response = await this._fetch({
            url, config, session, isRetry: true
          });
        }
      }

    return response;
  }

  async get({ endpoint, headers = {}, params = {}, session = {}, external = false }) {

    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    const response = await this._fetch({
      url: external ? endpoint : RequestURL.href,
      config: {
        method: 'GET',
        headers,
        params
      },
      session: session
    });

    const responseData = response.data;

    if ( response.status >= 200 && response.status < 300 ) {
      return responseData;
    } else {
      throw new RequestError({
        status: response.status,
        message: responseData,
      });
    }

  }

  async post({ endpoint, headers = {}, data = {}, params = {}, session = {}, external = false }) {

    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    const response = await this._fetch({
      url: external ? endpoint : RequestURL.href,
      config: {
        method: 'POST',
        data,
        headers,
        params
      },
      session: session
    });

    const responseData = response.data;

    if ( response.status >= 200 && response.status < 300 ) {
      return responseData;
    } else {
      throw new RequestError({
        status: response.status,
        message: responseData,
      });
    }

  }

  async patch({ endpoint, headers = {}, data = {}, session = {}, external = false }) {
    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    const response = await this._fetch({
      url: external ? endpoint : RequestURL.href,
      config: {
        method: 'PATCH',
        data,
        headers
      },
      session: session
    });

    const responseData = response.data;

    if( response.status >= 200 && response.status < 300 ) {
      return responseData;
    }
    else {
      throw new RequestError({
        status: response.status,
        message: responseData,
      });
    }

  }

  async delete({ endpoint, headers = {}, session = {}, external = false }) {
    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    const response = await this._fetch({
      url: external ? endpoint : RequestURL.href,
      config: {
        method: 'DELETE',
        headers
      },
      session: session
    });

    if( response.status >= 200 && response.status < 300 ) {
      return response;
    }
    else {
      throw new RequestError({
        status: response.status,
        message: response,
      });
    }

  }

  // Request new credentials and update session object
  async refreshCredentials({ session = {}, params = {}, isRetry = false }) {
    const RequestURL = this.URL;
    const endpoint = this.refreshCredentialsPath;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    console.log("Refresh credentials: ", session);
    const response = await this._fetch({
      url: RequestURL.href,
      config: {
        method: 'POST',
        data: {
          refresh: session.refreshToken
        },
        params
      },
      session: session,
      isRetry: isRetry
    });

    if( response.status >= 200 && response.status < 300 ) {
      const data = response.data;
      session.accessToken = data.access;
      session.refreshToken = data.refresh;

      refreshSession.update(value =>{ 
        value.accessToken = data.access;
        value.refreshToken = data.refresh;
        return value;
      });
    }
    
    return response;

  }

}
