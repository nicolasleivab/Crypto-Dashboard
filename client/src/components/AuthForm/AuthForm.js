import React, { useState, useContext, Fragment, useEffect } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '../Alert/Alert';
import { connect } from 'react-redux';
import { loginUser, registerUser, clearErrors } from 'actions/auth';
import { hideModal } from 'actions/modal';
import { setAlert } from 'actions/alert';
import styles from './AuthForm.module.css';

const AuthForm = (props) => {
  const {
    loginUser,
    registerUser,
    isAuthenticated,
    error,
    clearErrors,
    hideModal,
    setAlert,
  } = props;

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    password2: '',
  });

  const [authForm, setForm] = useState('login');

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (authForm === 'login') {
      loginUser(user);
    } else {
      if (name === '' || email === '' || password === '' || password2 === '') {
        setAlert('Missing Fields', 'Red');
      } else if (password !== password2) {
        setAlert('Passwords do not match', 'Red');
      } else if (password.length < 6) {
        setAlert('Password must contain at least 6 characters', 'Red');
      } else {
        registerUser(user);
      }
    }
  };

  useEffect(() => {
    if (error === 'Invalid credentials') {
      setAlert(error, 'Red');
      clearErrors();
    }
    if (error === 'User already exists') {
      setAlert(error, 'Red');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  return (
    <div className={authForm === 'login' ? styles.Login : styles.Register}>
      <div className={styles.alertBox}>
        <Alert />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          marginTop: 0,
        }}
      >
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => hideModal()}
          onKeyPress={(e) => (e.key === 'Enter' ? hideModal() : null)}
          tabIndex={0}
        />
        <p className={styles.title}>
          {authForm === 'login' ? 'Member Login' : 'Register Account'}
        </p>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          onSubmit={onSubmit}
        >
          {authForm === 'register' && (
            <input
              type='name'
              placeholder='Name'
              name='name'
              value={name}
              required='required'
              onChange={onChange}
              maxLength={35}
              style={{ paddingLeft: 15 }}
              tabIndex={0}
            />
          )}
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            required='required'
            onChange={onChange}
            maxLength={35}
            style={
              authForm === 'login' ? { paddingLeft: 35 } : { paddingLeft: 15 }
            }
            tabIndex={0}
          />
          {authForm === 'login' && <EmailIcon className={styles.emailIcon} />}

          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            required='required'
            onChange={onChange}
            maxLength={35}
            style={
              authForm === 'login' ? { paddingLeft: 35 } : { paddingLeft: 15 }
            }
            tabIndex={0}
          />
          {authForm === 'register' && (
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              required='required'
              onChange={onChange}
              maxLength={35}
              style={{ paddingLeft: 15 }}
              tabIndex={0}
            />
          )}
          {authForm === 'login' && <LockIcon className={styles.lockIcon} />}
          <input
            type='submit'
            value={authForm === 'login' ? 'LOGIN' : 'REGISTER'}
            className={styles.btnGray}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {authForm === 'login' ? (
              <Fragment>
                <p className={styles.bodyText}>New user?</p>

                <div
                  className={styles.signUp}
                  onClick={() => setForm('register')}
                  onKeyPress={(e) =>
                    e.key === 'Enter' ? setForm('register') : null
                  }
                  tabIndex={0}
                >
                  Sign up
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div>
                  <p className={styles.bodyText}> Already have an account?</p>
                </div>
                <div
                  className={styles.signUp}
                  onClick={() => setForm('login')}
                  onKeyPress={(e) =>
                    e.key === 'Enter' ? setForm('login') : null
                  }
                  tabIndex={0}
                >
                  Sign in
                </div>
              </Fragment>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  loginUser,
  registerUser,
  clearErrors,
  hideModal,
  setAlert,
})(AuthForm);
