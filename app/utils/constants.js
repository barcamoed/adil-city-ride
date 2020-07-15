export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const BASE_URL =
  'https://www.bookcityride.co.il/new/client_communication/cr_website/cr_website.php';
export const BASE_IMAGE_URL = 'https://www.bookcityride.co.il/';
export const PASSWORD = 'tx6bp3000gw5s!c5';
export const IDENTIFIER = 'cr_website';
import md5 from 'md5';
export const GETKEY = () => {
  const myDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jerusalem',
  });
  const myTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour12: false,
    hour: 'numeric',
  });
  const formattedToken = myDate + ' ' + myTime + ':00';
  const finalToken = new Date(formattedToken).getTime() / 1000;
  const key = md5(PASSWORD + IDENTIFIER + 'get_cities' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GETVEHICLESKEY = () => {
  const myDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jerusalem',
  });
  const myTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour12: false,
    hour: 'numeric',
  });
  const formattedToken = myDate + ' ' + myTime + ':00';
  const finalToken = new Date(formattedToken).getTime() / 1000;
  const key = md5(PASSWORD + IDENTIFIER + 'get_vehicles' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_FLIGHT_DETAILS_KEY = () => {
  const myDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jerusalem',
  });
  const myTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour12: false,
    hour: 'numeric',
  });
  const formattedToken = myDate + ' ' + myTime + ':00';
  const finalToken = new Date(formattedToken).getTime() / 1000;
  const key = md5(PASSWORD + IDENTIFIER + 'get_flight_details' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_CHECK_LOCATION_KEY = () => {
  const myDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jerusalem',
  });
  const myTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour12: false,
    hour: 'numeric',
  });
  const formattedToken = myDate + ' ' + myTime + ':00';
  const finalToken = new Date(formattedToken).getTime() / 1000;
  const key = md5(PASSWORD + IDENTIFIER + 'check_location' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_CREATE_RESERVATION_KEY = () => {
  const myDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jerusalem',
  });
  const myTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour12: false,
    hour: 'numeric',
  });
  const formattedToken = myDate + ' ' + myTime + ':00';
  const finalToken = new Date(formattedToken).getTime() / 1000;
  const key = md5(PASSWORD + IDENTIFIER + 'create_reservation' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_RESERVATION_DETAILS_KEY = () => {
  const myDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Jerusalem',
  });
  const myTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour12: false,
    hour: 'numeric',
  });
  const formattedToken = myDate + ' ' + myTime + ':00';
  const finalToken = new Date(formattedToken).getTime() / 1000;
  const key = md5(
    PASSWORD + IDENTIFIER + 'get_reservation_details' + finalToken,
  );
  // console.log('Key', key);
  return key;
};
