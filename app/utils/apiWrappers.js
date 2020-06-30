import axios from 'axios';

const accessKey = 'accessToken';
const profile = 'userProfile';

const environments = [
  {
    name: 'dev',
    env: 'https://adt-dev.mobilelive.ca',
    apiHost: 'https://d3qv35y8tvum1q.cloudfront.net',
  },
  {
    name: 'qa',
    env: 'https://adt-qa.myorderdashboard.com',
    apiHost: 'https://d29z4n2gpqoeqt.cloudfront.net',
  },
  {
    name: 'prod',
    env: 'https://www.myorderdashboard.com',
    apiHost: 'https://d2mcrq783vsnc2.cloudfront.net',
  },
];

const getApiHost = () => {
  return 'https://www.bookcityride.co.il/new/client_communication/cr_website/cr_website.php';
};

export const apiHost = getApiHost();
export const config = () => {
  return {
    headers: {
      //   Authorization: `Bearer ${localStorage.getItem(accessKey)}`,

      'Content-type': 'application/x-www-form-urlencoded',

      'Access-Control-Allow-Origin': '*',
    },
  };
};

const axiosInterceptor = () => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 403) {
        localStorage.clear();
        window.location.pathname = '/login';
      } else {
        throw error;
      }
    },
  );
};
const request = {
  setToken: token => {
    localStorage.setItem(accessKey, token);
  },
  setProfile: value => {
    localStorage.setItem(profile, JSON.stringify(value));
  },
  getToken: () => {
    return localStorage.getItem(accessKey);
  },
  getProfile: () => {
    return JSON.parse(localStorage.getItem(profile));
  },
  get: url => {
    axiosInterceptor();
    return axios.get(`${apiHost}${url}`, config());
  },
  post: body => {
    axiosInterceptor();
    return axios.post(`${apiHost}`, body, config());
  },
  put: (url, body) => {
    axiosInterceptor();
    return axios.put(`${apiHost}${url}`, body, config());
  },
};

export const USER_RIGHTS = {};

// Todo: After login it will be fixed
// request.setToken('jhgjhgjhg');

export default request;
