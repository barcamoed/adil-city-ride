import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'Password too short!')
    .max(32, 'Password should less than 32 digits')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email Address')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .when('password', {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
});
export const phoneNumberMask = [
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
];
export const LoginShema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email Address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email Address')
    .required('Please enter your email'),
});

export const ContactUsScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email Address')
    .required('Please enter your email'),
  name: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

export const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password too short!')
    .max(32, 'Password should less than 32 digits')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Please confirm your password!')
    .when('password', {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
});

export const OrderNumberSchema = Yup.object().shape({
  order_number: Yup.number()
    .typeError('Must be a number')
    .required('Required')
    .min(6, 'Number too short!')
    .max(6, 'Number too long'),
  last_name: Yup.string().required('Required'),
});

export const searchSchema = Yup.object().shape({
  searchField: Yup.string().required('Search City'),
  passengers: Yup.string().required('Required'),
});

export const mapSchema = Yup.object().shape({
  from: Yup.string().required('Required'),
  destination: Yup.string().required('Required'),
});

export const bookingSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Use only alphabets')
    .required('Required'),
  last_name: Yup.string().required('Required'),
  phone_number: Yup.number()
    .required('Required')
    // .min(11, 'Number too short!')
    // .max(13, 'Number too long')
    .typeError('Must be a number'),
  email: Yup.string()
    .email()
    .required('Required'),
  arrival_date: Yup.date().required('Required'),
  arrival_flight_number: Yup.string()
    // .matches(
    //   /^([A-Z][A-Z][A-Z]?|[A-Z][0-9]|[0-9][A-Z])[0-9]{1,4}$/,
    //   'Invalid Flight Number',
    // )
    .required('Required'),
  arrival_time: Yup.string()
    .nullable()
    .required('Required'),
  departure_date: Yup.date().required('Required'),
  departure_flight_number: Yup.string()
    // .matches(
    //   /^([A-Z][A-Z][A-Z]?|[A-Z][0-9]|[0-9][A-Z])[0-9]{1,4}$/,
    //   'Invalid Flight Number',
    // )
    .required('Required'),
  departure_time: Yup.string()
    .nullable()
    .required('Required'),
  card_holder_name: Yup.string().required('Required'),
  card_number: Yup.string()
    .label('Card Number')
    .typeError('Must be a number of length 16-19')
    .max(19)
    .min(16)
    .required('Required'),
  exp_date: Yup.date()
    .label('Date')
    .min(new Date())
    .required('Required'),
  cvv: Yup.string()
    .label('CVV')
    .min(3)
    .max(4)
    .required(),
  from: Yup.string().required(),
  destination: Yup.string().required(),
});

export const ProfileSchema = Yup.object().shape(
  {
    oldPassword: Yup.string().when(['newPassword', 'confirmPassword'], {
      is: (newPass, conPass) => newPass || conPass,
      then: Yup.string()
        .required('Required')
        .min(6, 'Password too short!')
        .max(32, 'Password should less than 32 digits'),
    }),
    newPassword: Yup.string().when(['oldPassword', 'confirmPassword'], {
      is: (oldPass, conPass) => oldPass || conPass,
      then: Yup.string()
        .required('Required')
        .min(6, 'Password too short!')
        .max(32, 'Password should less than 32 digits'),
    }),
    confirmPassword: Yup.string().when(['oldPassword', 'newPassword'], {
      is: (oldPass, newPass) => oldPass || newPass,
      then: Yup.string()
        .required('Required')
        .min(6, 'Password too short!')
        .max(32, 'Password should less than 32 digits')
        .when('newPassword', {
          is: val => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            'Both password need to be the same',
          ),
        }),
    }),
  },
  [
    ['oldPassword', 'newPassword'],
    ['oldPassword', 'confirmPassword'],
    ['newPassword', 'confirmPassword'],
  ],
);
