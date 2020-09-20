import React from 'react';
import { history } from 'umi';

export default class UserAdd extends React.Component {
  constructor() {
    super();
    this.usernameRef = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let username = this.usernameRef.current.value;
    let userList = localStorage.getItem('users');
    let users = userList ? JSON.parse(userList) : [];
    users.push({id: Date.now(), username});
    localStorage.setItem('users', JSON.stringify(users));
    history.push('/user/list');
  }
  render() {
    return (
      <>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-md-10 col-offset-2">
              <label htmlFor="username">用户名</label>
              <input className="form-control" ref={this.usernameRef}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-10 col-offset-2">
              <input type="submit" className="btn btn-primary" value="保存"/>
            </div>
          </div>
        </form>
      </>
    )
  }
}