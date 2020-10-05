import RequestError from './requestError.js';
import { API_URL } from '../../store/store.js';
import axios from 'axios';

export default class RequestService {
  constructor() {}

  get URL() {
    return new URL(API_URL);
  }

  // returns a promise with the data response
  // headers and params are objects
  async get(endpoint, headers, params, external) {
    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    if (params)
      Object.keys(params).forEach((key) =>
        RequestURL.searchParams.append(key, params[key])
      );

    const response = await axios.get(external ? endpoint : RequestURL.href, {
      headers: headers,
    });

    const data = response.data;

    if (response.status === 200 || response.status === 403) {
      return data;
    } else {
      throw new RequestError({
        status: response.status,
        message: data,
      });
    }
  }

  // returns a promise with the data response
  // headers and data are objects
  async post(endpoint, headers, data) {
    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    return fetch(RequestURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then(async (response) => {
      console.log("Response 1: ", response);
      return response.json().then((data) => {
        console.log("Response: ", response);
        console.log("Data: ", data);
        if (response.ok) return data;
        else
          throw new RequestError({
            status: response.status,
            message: data,
          });
      });
    });
  }

  // returns a promise with the data response
  // headers and data are objects
  async patch(endpoint, headers, data) {
    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    return fetch(RequestURL, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data),
    }).then(async (response) => {
      return response.json().then((data) => {
        if (response.ok) return data;
        else
          throw new RequestError({
            status: response.status,
            message: data,
          });
      });
    });
  }

  async delete(endpoint, headers) {
    const RequestURL = this.URL;
    RequestURL.pathname = endpoint.startsWith('/') ? endpoint : '/' + endpoint;

    return fetch(RequestURL, {
      method: 'DELETE',
      headers: headers,
    }).then(async (response) => {
      if (response.ok) return response;
      else
        throw new RequestError({
          status: response.status,
          message: data,
        });
    });
  }
}
