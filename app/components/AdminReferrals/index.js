import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  IDENTIFIER,
  GET_CREATE_AFFILIATE_USER_KEY,
  GET_ALL_AFFILIATE_USERS_KEY,
  GET_AFFILIATE_APPROVED_EARNING_KEY,
  GET_EDIT_AFFILIATE_USER_KEY,
  GET_DELETE_AFFILIATE_USER_KEY,
  GET_CLEAR_AFFILIATE_APPROVED_KEY,
} from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AdminHeader from '../AdminHeader';
import {
  CreateAffiliateUserSchema,
  AdminEditUserSchema,
} from '../Login/schema';

const AdminReferrals = props => {
  const [emailAlreadyExistsError, setEmailAlreadyExistError] = useState('');
  const [emailAlreadyExistsErrorEdit, setEmailAlreadyExistErrorEdit] = useState(
    '',
  );
  const [invalidParmasErrorEdit, setInvalidParamsErrorEdit] = useState('');
  const [invalidParmasError, setInvalidParamsError] = useState('');
  const [affiliateUsers, setAffiliateUsers] = useState([]);
  const [modalData, setModalData] = useState({});
  const [fieldDisabled, setFieldDisabled] = useState(true);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalCommission, setModalCommission] = useState('');
  const [modalCookie, setModalCookie] = useState('');
  const [modalEarning, setModalEarning] = useState('');
  const [modalActive, setModalActiveVal] = useState('');
  const [modalRole, setModalRole] = useState('');
  const [showOtherButtons, setOtherButtons] = useState(true);
  const [userID, setUserId] = useState('');
  const [noUpdateDone, setNoUpdateDoneError] = useState('');
  const [missingValidParams, setMissingValidParams] = useState('');
  const [totalDonotMatch, setTotalDonotMatchError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (
      localStorage.getItem('admin_details') &&
      (JSON.parse(localStorage.getItem('admin_details')) != undefined ||
        JSON.parse(localStorage.getItem('admin_details')) != '' ||
        JSON.parse(localStorage.getItem('admin_details')) != null) &&
      JSON.parse(localStorage.getItem('admin_details')).au_role == '1'
    ) {
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      let formData = new FormData();
      formData.append(`command`, 'get_affiliate_users');
      formData.append(`identifier`, IDENTIFIER);
      formData.append(`key`, GET_ALL_AFFILIATE_USERS_KEY());
      formData.append(`data[search]`, '');

      if (affiliateUsers == '') {
        postRequest(formData, headers).then(data => {
          // console.log('Response Data:', data);
          // console.log('Props:', props);
          if (data.status == 'ok') {
            // console.log('Data If Status Ok', data);
            setAffiliateUsers(data.users);
            localStorage.setItem('admin_ref_users', JSON.stringify(data.users));
          }
        });
      }
    } else {
      props.history.push('/admin/login');
    }
  }, [affiliateUsers, fieldDisabled]);

  const filterUsers = affiliateUsers.filter(
    active =>
      active.name.toLowerCase().indexOf(search) !== -1 ||
      active.email.toLowerCase().indexOf(search) !== -1,
  );

  const createUserRequest = values => {
    // console.log('Values Insode Function', values);
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    formData.append(`command`, 'create_affiliate_user');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_CREATE_AFFILIATE_USER_KEY());
    formData.append(`data[name]`, values.name);
    formData.append(`data[email]`, values.email);
    formData.append(`data[commission]`, values.commission);
    formData.append(`data[cookie]`, values.cookie_time);
    formData.append(`data[role]`, '2');
    formData.append(`data[password]`, values.password);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    postRequest(formData, headers).then(data => {
      // console.log('Response Data:', data);
      // console.log('Props:', props);
      if (data.status == 'ok') {
        // console.log('Data If Status Ok', data);
        alert('User Created');
        $('#certificates-pop').modal('hide');
        window.location = 'http://localhost:3000/admin/referrals';
      } else if (data.status == 'error' && data.error_code == 1) {
        setEmailAlreadyExistError(data.message);
        setInvalidParamsError('');
        // console.log('Data Error', data);
      } else if (data.status == 'error' && data.error_code == 2) {
        setInvalidParamsError('Make sure all fields are filled');
        setEmailAlreadyExistError('');
        // console.log('Data Error', data);
      }
    });
  };

  function putDataInModal(val) {
    // console.log('Data In Function', val);
    setUserId(val.id);
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    formData.append(`command`, 'get_affiliate_approved_earning');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_AFFILIATE_APPROVED_EARNING_KEY());
    formData.append(`data[user_id]`, val.id);

    postRequest(formData, headers).then(data => {
      // console.log('get_affiliate_approved_earning response:', data);
      // console.log('Props:', props);
      if (data.status == 'ok') {
        // console.log('Data If Status Ok', data);
        val.eur_total = data.earning.eur_total;
        setModalData(val);
        setModalName(val.name);
        setModalEmail(val.email);
        setModalCommission(val.commission);
        setModalCookie(val.cookie);
        setModalActiveVal(val.active);
        setModalRole(val.role);
        setModalEarning(data.earning.eur_total);
      }
    });
  }

  function handleField(setFieldValue) {
    setFieldDisabled(false);
    setOtherButtons(false);
    setFieldValue('name', modalName);
    setFieldValue('email', modalEmail);
    setFieldValue('commission', modalCommission);
    setFieldValue('active', modalActive);
    setFieldValue('earning', modalEarning);
    setFieldValue('role', modalRole);
    setFieldValue('cookie', modalCookie);
  }
  function handleFieldValue(e, setFieldValue) {
    if (e.target.name == 'name') {
      setModalName(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    } else if (e.target.name == 'email') {
      setModalEmail(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    } else if (e.target.name == 'commission') {
      setModalCommission(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    } else if (e.target.name == 'cookie') {
      setModalCookie(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    } else if (e.target.name == 'earning') {
      setModalEarning(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    } else if (e.target.name == 'active') {
      setModalActiveVal(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    } else if (e.target.name == 'role') {
      setModalRole(e.target.value);
      setFieldValue(e.target.name, e.target.value);
    }
  }

  function editUserRequest(values) {
    // console.log('Hereeeeeee', values);

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    formData.append(`command`, 'edit_affiliate_user');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_EDIT_AFFILIATE_USER_KEY());
    formData.append(`data[id]`, userID);
    formData.append(`data[name]`, values.name);
    formData.append(`data[email]`, values.email);
    formData.append(`data[commission]`, parseFloat(values.commission));
    formData.append(`data[cookie]`, parseInt(values.cookie));
    formData.append(`data[role]`, parseInt(values.role));
    formData.append(`data[active]`, parseInt(values.active));

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    postRequest(formData, headers).then(data => {
      // console.log('Response Data:', data);
      // console.log('Props:', props);
      if (data.status == 'ok') {
        // console.log('Data If Status is Ok', data);
        alert('User Edited');
        $('#referral-details').modal('hide');
        setOtherButtons(true);
        setFieldDisabled(true);
        window.location = 'http://localhost:3000/admin/referrals';
      } else if (data.status == 'error') {
        // console.log('Errorrrrrrr:', data);
        if (data.error_code == 1) {
          setEmailAlreadyExistErrorEdit(data.message);
          setInvalidParamsErrorEdit('');
        } else if (data.error_code == 2) {
          setEmailAlreadyExistErrorEdit('');
          setInvalidParamsErrorEdit(data.message);
        } else if (data.error_code == 3) {
          setEmailAlreadyExistError('');
          setInvalidParamsErrorEdit('');
          setNoUpdateDoneError(data.message);
        }
      }
    });
  }

  function deleteRequest() {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    formData.append(`command`, 'delete_affiliate_user');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_DELETE_AFFILIATE_USER_KEY());
    formData.append(`data[id]`, userID);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    postRequest(formData, headers).then(data => {
      console.log('Response Data:', data);
      if (data.status == 'ok') {
        // console.log('Data If Status is Ok', data);
        alert('User Deleted');
        $('#referral-details').modal('hide');
        setOtherButtons(true);
        setFieldDisabled(true);
        window.location = 'http://localhost:3000/admin/referrals';
      } else {
        console.log('Errorr:', data);
      }
    });
  }

  function clearEarningRequest() {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    formData.append(`command`, 'clear_affiliate_approved_earning');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_CLEAR_AFFILIATE_APPROVED_KEY());
    formData.append(`data[user_id]`, userID);
    formData.append(`data[total_eur_earning]`, 30);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    postRequest(formData, headers).then(data => {
      // console.log('Response Data:', data);
      if (data.status == 'ok') {
        // console.log('Data If Status is Ok', data);
        alert('User Deleted');
        $('#referral-details').modal('hide');
        setOtherButtons(true);
        setFieldDisabled(true);
        window.location = 'http://localhost:3000/admin/referrals';
      } else if (data.status == 'error') {
        // console.log('Errorrrrrrr:', data);
        if (data.error_code == 1) {
          setMissingValidParams('');
          setTotalDonotMatchError(data.message);
        } else if (data.error_code == 2) {
          setTotalDonotMatchError('');
          setMissingValidParams(data.message);
        }
      }
    });
  }

  return (
    <div>
      <AdminHeader props={props} />
      <div>
        <div className="page-wrapper">
          {/* ============================================================== */}
          {/* Container fluid  */}
          {/* ============================================================== */}
          <div className="container-fluid">
            {/* ============================================================== */}
            {/* Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* End Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* Start Page Content */}
            {/* ============================================================== */}
            <div className="row tabs-order ">
              <div className="col-md-12">
                <div className="referrals">
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs customtab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link">
                        <span className="order-txt">Referrals</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active show"
                        data-toggle="tab"
                        href="#active"
                        role="tab"
                        aria-selected="true"
                      >
                        <span className>Active</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#inactive"
                        role="tab"
                        aria-selected="false"
                      >
                        <span className>Blocked</span>
                      </a>
                    </li>
                    <li className="nav-item search-customer">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#certificates-pop"
                        className="btn btn-primary"
                      >
                        Create Referral
                      </button>
                    </li>
                    <li className="nav-item search-customer searchbtn">
                      <input
                        type="text"
                        id="demo-foo-search"
                        name="example-input-normal"
                        className="form-control filter-input"
                        placeholder="Search"
                        value={search}
                        onChange={e =>
                          setSearch(e.target.value.toLowerCase().substr(0, 20))
                        }
                      />
                      {/* <button type="button" className="btn btn-primary filter">
                        Search
                      </button> */}
                    </li>
                  </ul>
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div
                      className="tab-pane active show"
                      id="active"
                      role="tabpanel"
                    >
                      <div className="row recent-table customer-table">
                        <div className="col-lg-12">
                          <div className="card">
                            <div className="card-body1">
                              <div className="table-responsive">
                                <table
                                  className="table"
                                  id="demo-foo-addrow"
                                  data-page-size={10}
                                >
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Percentage</th>
                                      <th>Cookie</th>
                                      <th>Details</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {filterUsers && Array.isArray(filterUsers)
                                      ? filterUsers
                                          .slice(0, filterUsers.length)
                                          .map(item => {
                                            return (
                                              <React.Fragment>
                                                {item.active == '1' ? (
                                                  <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.commission}%</td>
                                                    <td>{item.cookie}</td>
                                                    <td>
                                                      <button
                                                        data-toggle="modal"
                                                        data-target="#referral-details"
                                                        type="button"
                                                        name="button"
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                          putDataInModal(item)
                                                        }
                                                      >
                                                        Referral Detail
                                                      </button>
                                                    </td>
                                                  </tr>
                                                ) : null}
                                              </React.Fragment>
                                            );
                                          })
                                      : null}
                                  </tbody>

                                  <tfoot>
                                    <tr>
                                      <td colSpan={8}>
                                        <div className="text-right">
                                          <ul className="pagination pagination-split m-t-30">
                                            {' '}
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="inactive" role="tabpanel">
                      <div className="row recent-table customer-table">
                        <div className="col-lg-12">
                          <div className="card">
                            <div className="card-body1">
                              <div className="table-responsive">
                                <table
                                  className="table"
                                  id="demo-foo-addrow"
                                  data-page-size={10}
                                >
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Percentage</th>

                                      <th>Cookie</th>
                                      <th>Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filterUsers && Array.isArray(filterUsers)
                                      ? filterUsers
                                          .slice(0, filterUsers.length)
                                          .map(item => {
                                            return (
                                              <React.Fragment>
                                                {item.active == '0' ? (
                                                  <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.commission}%</td>
                                                    <td>{item.cookie}</td>
                                                    <td>
                                                      <button
                                                        data-toggle="modal"
                                                        data-target="#referral-details"
                                                        type="button"
                                                        name="button"
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                          putDataInModal(item)
                                                        }
                                                      >
                                                        Referral Detail
                                                      </button>
                                                    </td>
                                                  </tr>
                                                ) : null}
                                              </React.Fragment>
                                            );
                                          })
                                      : null}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td colSpan={8}>
                                        <div className="text-right">
                                          <ul className="pagination pagination-split m-t-30">
                                            {' '}
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ============================================================== */}
          {/* End PAge Content */}
          {/* ============================================================== */}
        </div>
        {/* ============================================================== */}
        {/* End Container fluid  */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* End Page wrapper  */}
        {/* ============================================================== */}
        <div
          className="modal fade add-user admin-login"
          id="certificates-pop"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel1"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel1">
                  Create New Referral
                </h4>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    commission: '',
                    cookie_time: '',
                    password: '',
                  }}
                  validationSchema={CreateAffiliateUserSchema}
                  onSubmit={values => {
                    // console.log('Moeeddddd:', values);
                    createUserRequest(values);
                  }}
                >
                  {({ errors, touched, isSubmitting, setFieldValue }) => (
                    <Form className="form-material">
                      <div className="form-group">
                        <label>
                          Name
                          <span className="help" />
                        </label>
                        {errors.name && touched.name ? (
                          <div className="errorLogin">{errors.name}</div>
                        ) : null}

                        <Field
                          type="text"
                          name="name"
                          className="form-control form-control-line disabled"
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Email
                          <span className="help" />
                        </label>
                        {errors.email && touched.email ? (
                          <div className="errorLogin">{errors.email}</div>
                        ) : null}
                        <Field
                          type="email"
                          name="email"
                          className="form-control form-control-line"
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Commission Percentage
                          <span className="help" />
                        </label>
                        {errors.commission && touched.commission ? (
                          <div className="errorLogin">{errors.commission}</div>
                        ) : null}
                        <Field
                          type="number"
                          name="commission"
                          className="form-control form-control-line"
                          placeholder="Enter percentage"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Cookie
                          <span className="help" />
                        </label>
                        {errors.cookie_time && touched.cookie_time ? (
                          <div className="errorLogin">{errors.cookie_time}</div>
                        ) : null}
                        <Field
                          type="number"
                          name="cookie_time"
                          className="form-control form-control-line"
                          placeholder="Enter Cookie Time"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Password
                          <span className="help" />
                        </label>
                        {errors.password && touched.password ? (
                          <div className="errorLogin">{errors.password}</div>
                        ) : null}
                        <Field
                          type="password"
                          name="password"
                          className="form-control form-control-line"
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="modal-footer">
                        {emailAlreadyExistsError || invalidParmasError ? (
                          <div className="errorUserCreate">
                            {emailAlreadyExistsError
                              ? emailAlreadyExistsError
                              : invalidParmasError}
                          </div>
                        ) : null}
                        <button
                          type="button"
                          className="btn btn-rounded btn-outline-primary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-rounded btn-outline-primary"
                        >
                          + Create
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-rounded btn-outline-primary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-rounded btn-outline-primary"
                >
                  + Create
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div
          className="modal fade add-user admin-login"
          id="referral-details"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel1"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel1">
                  Referral Detail
                </h4>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    name: modalName,
                    email: modalEmail,
                    commission: modalCommission,
                    cookie: modalCookie,
                    earning: modalEarning,
                    role: modalRole,
                    active: modalActive,
                  }}
                  validationSchema={AdminEditUserSchema}
                  onSubmit={values => {
                    console.log('Moeeddddd:', values);
                    editUserRequest(values);
                  }}
                >
                  {({ errors, touched, isSubmitting, setFieldValue }) => (
                    <Form className="form-material">
                      <div className="form-group">
                        <label>
                          Name
                          <span className="help" />
                        </label>

                        {errors.name && touched.name ? (
                          <div className="errorEditUser">{errors.name}</div>
                        ) : null}

                        <Field
                          type="text"
                          value={modalName}
                          className="form-control form-control-line"
                          placeholder="Enter name"
                          readOnly={fieldDisabled}
                          name="name"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Email
                          <span className="help" />
                        </label>
                        {errors.email && touched.email ? (
                          <div className="errorEditUser">{errors.email}</div>
                        ) : null}
                        <Field
                          type="email"
                          value={modalEmail}
                          name="email"
                          className="form-control form-control-line"
                          placeholder="Enter email"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                          readOnly={fieldDisabled}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Commission
                          <span className="help" />
                        </label>
                        {errors.commission && touched.commission ? (
                          <div className="errorEditUser">
                            {errors.commission}
                          </div>
                        ) : null}
                        <Field
                          type="number"
                          value={modalCommission}
                          name="commission"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                          className="form-control form-control-line"
                          placeholder="Enter city"
                          readOnly={fieldDisabled}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Cookie
                          <span className="help" />
                        </label>

                        {errors.cookie && touched.cookie ? (
                          <div className="errorEditUser">{errors.cookie}</div>
                        ) : null}
                        <Field
                          type="text"
                          value={modalCookie}
                          name="cookie"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                          className="form-control form-control-line"
                          placeholder="Enter rides"
                          readOnly={fieldDisabled}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Role
                          <span className="help" />
                        </label>

                        {errors.role && touched.role ? (
                          <div className="errorEditUser">{errors.role}</div>
                        ) : null}
                        <Field
                          type="text"
                          value={modalRole}
                          name="role"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                          className="form-control form-control-line"
                          placeholder="Enter percentage"
                          readOnly={fieldDisabled}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Active
                          <span className="help" />
                        </label>

                        {errors.active && touched.active ? (
                          <div className="errorEditUser">{errors.active}</div>
                        ) : null}
                        <Field
                          type="text"
                          value={modalActive}
                          name="active"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                          className="form-control form-control-line"
                          placeholder="Enter percentage"
                          readOnly={fieldDisabled}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Approved Earning
                          <span className="help" />
                        </label>

                        {errors.earning && touched.earning ? (
                          <div className="errorEditUser">{errors.earning}</div>
                        ) : null}
                        <Field
                          type="text"
                          value={modalEarning}
                          name="earning"
                          onChange={e => handleFieldValue(e, setFieldValue)}
                          className="form-control form-control-line"
                          placeholder="Enter percentage"
                          readOnly={true}
                        />
                      </div>
                      {showOtherButtons ? (
                        <div className="modal-footer">
                          {missingValidParams || totalDonotMatch ? (
                            <div className="errorOnMarkPaid">
                              {missingValidParams
                                ? missingValidParams
                                : totalDonotMatch}
                            </div>
                          ) : null}

                          <button
                            type="button"
                            className="btn btn-rounded btn-outline-primary"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-rounded btn-outline-primary"
                            onClick={() => deleteRequest()}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-rounded btn-outline-primary"
                            onClick={() => handleField(setFieldValue)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-rounded btn-outline-primary"
                            // onClick={clearEarningRequest}
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you wish to delete this item?',
                                )
                              )
                                clearEarningRequest();
                            }}
                          >
                            Mark Paid
                          </button>
                        </div>
                      ) : (
                        <div className="modal-footer">
                          {emailAlreadyExistsErrorEdit ||
                          invalidParmasErrorEdit ||
                          noUpdateDone ? (
                            <div className="errorUserCreate">
                              {emailAlreadyExistsErrorEdit
                                ? emailAlreadyExistsErrorEdit
                                : invalidParmasErrorEdit
                                ? invalidParmasErrorEdit
                                : noUpdateDone}
                            </div>
                          ) : null}
                          <button
                            type="submit"
                            className="btn btn-rounded btn-outline-primary"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminReferrals.propTypes = {};

export default AdminReferrals;
