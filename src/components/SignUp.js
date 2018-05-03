import React, { Component } from 'react';
import { 
	Link,
	withRouter,
} from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';



const SignUpPage = ({ history }) =>
  <div>
    <h1 className="sign-in-label">Sign Up</h1>
    <SignUpForm history={history} />
  </div>


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});





class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

     const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {

  	const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

	  const isInvalid =
	  passwordOne !== passwordTwo ||
	  passwordOne === '' ||
	  email === '' ||
	  username === '';


    return (
      <form id="form-id"className="form-1" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" disabled={isInvalid} type="submit">
            Sign Up
          </button>
          { error && <p>{error.message}</p> }
        </div>
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};