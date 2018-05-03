import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';


// should probably add message letting you know the email was sent 
const PasswordForgetPage = () =>
  <div>
    <h1>Forgot Password</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" disabled={isInvalid} type="submit">
            Reset My Password
          </button>

          { error && <p>{error.message}</p> }
        </div>
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};