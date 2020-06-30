/* eslint-disable no-console */
import axios from 'axios';
// import { toast } from 'react-toastify';
import { BASE_URL } from './constants';
/**
 * Parses the JSON returned by a network request
 *
 * @param {object} response A response from a network request
 *
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param {object} response A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 *
 * @return {object} The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const getRequest = url => {
  axios
    .get(url)
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const getRequestById = (url, id) => {
  axios
    .get(url, {
      params: {
        ID: id,
      },
    })
    .then(response => response)
    .catch(() => {})
    .then(() => {
      // always executed
    });
};

// post request

export const postRequest = (bodyObject, headers, history = {}) => {
  // let responseData = [];

  var data = axios
    .post(`${BASE_URL}`, bodyObject, headers)
    .then(response => {
      const { message } = response && response.data;
      // console.log('Response Data', response.data);
      return response.data;

      // toast.success(message);
      // history.push('/login');
    })
    .catch(response => {
      // toast.error('something wents wrong!');
      console.log('response issue', response);
      // history.push('/register');
    });
  return data;
};

export const userLoginRequest = (url, bodyObject, history = {}) => {
  axios
    .post(`${BASE_URL}${url}`, bodyObject)
    .then(response => {
      // toast.success('you are logged In Successfuly!');
      // const { token, userId } = response && response.data;
      // localStorage.setItem('accessToken', token);
      // localStorage.setItem('userId', userId);
      return response && response.data;
      // history.push('/dashboard');
    })
    .catch(err => {
      const { data } = err.response;
      // toast.error(data.message);
    });
};

export const forgotPasswordRequest = (url, bodyObject) => {
  axios
    .post(`${BASE_URL}${url}`, bodyObject)
    .then(response => {
      const { message } = response && response.data;
      toast.success(message);
    })
    .catch(err => {
      const { data } = err.response;
      toast.error(data.message);
    });
};

export const updatePasswordRequest = (url, bodyObject, history = {}) => {
  axios
    .post(`${BASE_URL}${url}`, bodyObject)
    .then(response => {
      const { message } = response && response.data;
      // toast.success(message);
      // history.push('/login');
    })
    .catch(() => {
      toast.error('something wents wrong!');
    });
};

export const createFeedbacks = (url, bodyObject, history = {}) => {
  axios
    .post(`${BASE_URL}${url}`, bodyObject)
    .then(response => {
      const { message } = response && response.data;
      // history.push('/thank-you');
      // toast.success(message);
    })
    .catch(err => {
      const { message } = err && err.response.data;
      toast.error(message);
    });
};

export const getQuestionsAnswers = url => {
  axios
    .get(`${BASE_URL}${url}`)
    .then(response => response && response.data)
    .catch(() => {})
    .then(() => {
      // always executed
    });
};

export const logout = history => {
  // localStorage.removeItem('accessToken');
  // history.push('/login');
};
