// 动态路由 
// umi 里约定， [] 包裹的文件或文件夹为动态路由。
import React from 'react';

export default class UserDetail extends React.Component {
  render() {
    const user = this.props.location.state;
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
            <td>{user.id}</td>
            <td>{user.username}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}