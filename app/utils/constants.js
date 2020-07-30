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

export const GET_CONTACT_US_KEY = () => {
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
  const key = md5(PASSWORD + IDENTIFIER + 'send_contact_form' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_CREATE_BOOKING_KEY = () => {
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
    PASSWORD + IDENTIFIER + 'create_booking_request' + finalToken,
  );
  // console.log('Key', key);
  return key;
};

export const GET_AFFILIATE_USER_LOGIN_KEY = () => {
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
  const key = md5(PASSWORD + IDENTIFIER + 'affiliate_user_login' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_CREATE_AFFILIATE_USER_KEY = () => {
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
  const key = md5(PASSWORD + IDENTIFIER + 'create_affiliate_user' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_ALL_AFFILIATE_USERS_KEY = () => {
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
  const key = md5(PASSWORD + IDENTIFIER + 'get_affiliate_users' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_AFFILIATE_APPROVED_EARNING_KEY = () => {
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
    PASSWORD + IDENTIFIER + 'get_affiliate_approved_earning' + finalToken,
  );
  // console.log('Key', key);
  return key;
};

export const GET_EDIT_AFFILIATE_USER_KEY = () => {
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
  const key = md5(PASSWORD + IDENTIFIER + 'edit_affiliate_user' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_DELETE_AFFILIATE_USER_KEY = () => {
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
  const key = md5(PASSWORD + IDENTIFIER + 'delete_affiliate_user' + finalToken);
  // console.log('Key', key);
  return key;
};

export const GET_CLEAR_AFFILIATE_APPROVED_KEY = () => {
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
    PASSWORD + IDENTIFIER + 'clear_affiliate_approved_earning' + finalToken,
  );
  // console.log('Key', key);
  return key;
};

export const GET_AFFILIATE_ADMIN_VIEW_KEY = () => {
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
    PASSWORD + IDENTIFIER + 'get_affiliate_admin_view' + finalToken,
  );
  // console.log('Key', key);
  return key;
};

export const GET_AFFILIATE_USER_VIEW_KEY = () => {
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
    PASSWORD + IDENTIFIER + 'get_affiliate_user_view' + finalToken,
  );
  // console.log('Key', key);
  return key;
};
