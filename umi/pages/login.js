import React from 'react';
import { history } from 'umi';

class Login extends React.Component {
  render() {
    return (
      <>
        <button className="btn btn-primary" onClick={() => {
            localStorage.setItem('login', true);
            if(this.props.location.state && this.props.location.state.from) {
              history.push(this.props.location.state.from);
            }else {
              history.push('/');
            }
          }
        }>
          登录
        </button>
      </>
    )
  }
}

Login.title = '登录';

export default Login;