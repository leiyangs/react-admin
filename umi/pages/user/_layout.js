// 名字是定死的
import React from 'react';
import { Link } from 'umi';

export default class UserLayout extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <ul className="list-group">
            <li className="list-group-item"><Link to="/user/add">添加用户</Link></li>
            <li className="list-group-item"><Link to="/user/list">用户列表</Link></li>
          </ul>
        </div>
        <div className="col-md-9">
          {this.props.children}
        </div>
      </div>
    )
  }
}