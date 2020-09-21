// 动态路由 
// umi 里约定， [] 包裹的文件或文件夹为动态路由。
import React from 'react';

export default class UserDetail extends React.Component {
  state = {user: {}}
  componentDidMount() {
    let user = this.props.location.state;
    if(!user) {
      let userStr = localStorage.getItem('users');
      let users = userStr ? JSON.parse(userStr) : [];
      user = users.find(user => user.id == this.props.match.params.id ? user : {id: '', username: ''});
    }
    this.setState({user});
  }
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>id</td>
            <td>姓名</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.state.user.id}</td>
            <td>{this.state.user.username}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}